import { PrismaClient } from '@prisma/client';
import {
  ApplicationCommandOptionType,
  CachedType,
  CategoryChannel,
  ChannelType,
  ChatInputCommandInteraction,
  Collection,
  GuildMember,
  VoiceChannel,
} from 'discord.js';
import { ArgsOf, Discord, Guard, On } from 'discordx';
import { Logger } from 'tslog';

import { GuildGuards } from '@/guards/guild';
import { Command, getLanguage, Group, Option } from '@/libraries/localization';

interface DeletionValidatorOptions {
  member: GuildMember;
  channel: VoiceChannel;
  isOrphan: boolean;
}

type DeletionValidator = (
  options: DeletionValidatorOptions
) => Promise<boolean> | boolean;

interface NameGeneratorOptions {
  count: number;
  member: GuildMember;
  template?: string | null;
}

type NameGenerator = (
  options: NameGeneratorOptions
) => Promise<string> | string;

interface VoiceChild {
  /** Child channel id. */
  channelId: string;

  /** The user who created the channel. */
  ownerId: string;

  /** Whether the channel is an orphan. */
  isOrphan: boolean;
}

interface VoiceParent {
  /** Category to create new private channels in. */
  categoryId?: string;

  /** Collection of `owner` to `private channel id`. */
  children: VoiceChild[];

  /** The channel to listen for new private channels create requests. */
  parentId: string;

  /** Function to generate the name of the private channel. */
  nameGenerator: NameGenerator;

  /** Template to generate the name of the private channel. */
  template?: string | null;
}

const DEFAULT_VALIDATORS: Record<string, DeletionValidator> = {
  isEmpty: ({ channel }) => channel.members.every((member) => member.user.bot),
};

const DEFAULT_NAME_GENERATOR: NameGenerator = ({ count, member, template }) => {
  if (!template) {
    return `🔸 ${member.displayName} (${count})`;
  }

  return template
    .replace('{USERNAME}', member.displayName)
    .replace('{COUNT}', count.toString());
};

@Group()
@Discord()
class CustomVoice {
  private static readonly deletionValidators: DeletionValidator[] = [];
  private static readonly parents = new Collection<string, VoiceParent>();

  /** Add a deletion validator to the list of validators. */
  static addDeletionValidators(validators: DeletionValidator[]) {
    this.deletionValidators.push(...validators);
  }

  /** Add a parent to the list of parents. */
  static createParent(parent: VoiceParent): void {
    this.parents.set(parent.parentId, parent);
  }

  /** Fetches all the parents saved in the database and registers them. */
  static async preloadFromPrismaAsync(
    prisma: PrismaClient,
    logger: Logger<unknown>
  ) {
    const guilds = await prisma.guild.findMany({
      where: { CustomVoice: { some: {} } },
      select: {
        CustomVoice: {
          select: { parentID: true, categoryID: true, template: true },
        },
      },
    });

    guilds.forEach(({ CustomVoice: guildCustomVoice }) => {
      guildCustomVoice.forEach(({ parentID, categoryID, template }) => {
        this.createParent({
          nameGenerator: DEFAULT_NAME_GENERATOR,
          categoryId: categoryID,
          parentId: parentID,
          children: [],
          template,
        });
      });
    });

    logger.info(
      `Preloaded ${guilds.length} guilds with ${this.parents.size} parents.`
    );
  }

  constructor(
    private readonly logger: Logger<unknown>,
    private readonly prisma: PrismaClient
  ) {
    CustomVoice.addDeletionValidators(Object.values(DEFAULT_VALIDATORS));
  }

  @Guard(
    GuildGuards.InGuild(),
    GuildGuards.HasPermissions({
      checkPermissionsFor: 'User',
      permissions: ['Administrator'],
    }),
    GuildGuards.HasPermissions({
      checkPermissionsFor: 'Client',
      permissions: ['ManageChannels', 'MoveMembers'],
    })
  )
  @Command()
  async setup(
    @Option({
      name: 'CUSTOMVOICE_SETUP_OPTION_CHANNEL_NAME',
      description: 'CUSTOMVOICE_SETUP_OPTION_CHANNEL_DESCRIPTION',
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildVoice],
      required: true,
    })
    channel: VoiceChannel,

    @Option({
      name: 'CUSTOMVOICE_SETUP_OPTION_CATEGORY_NAME',
      description: 'CUSTOMVOICE_SETUP_OPTION_CATEGORY_DESCRIPTION',
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildCategory],
    })
    category: CategoryChannel,

    @Option({
      name: 'CUSTOMVOICE_SETUP_OPTION_TEMPLATE_NAME',
      description: 'CUSTOMVOICE_SETUP_OPTION_TEMPLATE_DESCRIPTION',
      type: ApplicationCommandOptionType.String,
    })
    template: string | undefined,

    interaction: ChatInputCommandInteraction<CachedType>
  ) {
    interaction.logger.debug(
      `Received setup command from ${interaction.user.tag} in guild ${interaction.guildId}.`
    );

    const LL = getLanguage(interaction);
    const parentExists = CustomVoice.parents.has(channel.id);

    if (parentExists) {
      await interaction.reply(LL.ERRORS.PARENT_ALREADY_CONFIGURED());
      return;
    }

    await this.prisma.guild.upsert({
      where: {
        id: interaction.guildId,
      },
      update: {
        CustomVoice: {
          create: {
            parentID: channel.id,
            categoryID: category.id,
            template,
          },
        },
      },
      create: {
        id: interaction.guildId,
        CustomVoice: {
          create: {
            parentID: channel.id,
            categoryID: category.id,
            template,
          },
        },
      },
      select: {
        id: true,
      },
    });

    CustomVoice.createParent({
      nameGenerator: DEFAULT_NAME_GENERATOR,
      categoryId: category.id,
      parentId: channel.id,
      children: [],
    });

    interaction.logger.debug(
      `Registered parent channel ${channel.id} in guild ${interaction.guildId}.`
    );

    await interaction.reply({
      content: LL.SUCCESS_SETUP(),
      ephemeral: true,
    });
  }

  @Guard(
    GuildGuards.InGuild(),
    GuildGuards.HasPermissions({
      checkPermissionsFor: 'User',
      permissions: ['Administrator'],
    })
  )
  @Command()
  async updateTemplate(
    @Option({
      name: 'CUSTOMVOICE_SETUP_OPTION_TEMPLATE_NAME',
      description: 'CUSTOMVOICE_SETUP_OPTION_TEMPLATE_DESCRIPTION',
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    template: string,

    @Option({
      name: 'CUSTOMVOICE_SETUP_OPTION_CHANNEL_NAME',
      description: 'CUSTOMVOICE_SETUP_OPTION_CHANNEL_DESCRIPTION',
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildVoice],
      required: true,
    })
    channel: VoiceChannel,

    interaction: ChatInputCommandInteraction<CachedType>
  ) {
    interaction.logger.debug(
      `Received update template command from ${interaction.user.tag} in guild ${interaction.guildId}.`
    );

    const customVoiceExists =
      (await this.prisma.customVoice.count({
        where: { parentID: channel.id },
      })) > 0;

    if (!customVoiceExists) {
      const LL = getLanguage(interaction);

      await interaction.reply({
        content: LL.ERRORS.PARENT_NOT_FOUND(),
        ephemeral: true,
      });

      return;
    }

    await this.prisma.guild.upsert({
      where: {
        id: interaction.guildId,
      },
      update: {
        CustomVoice: {
          update: {
            where: { parentID: channel.id },
            data: { template },
          },
        },
      },
      create: {
        id: interaction.guildId,
        CustomVoice: {
          create: {
            parentID: channel.id,
            categoryID: channel.parentId!,
            template,
          },
        },
      },
      select: {
        id: true,
      },
    });

    let parent = CustomVoice.parents.get(channel.id);

    if (!parent) {
      CustomVoice.createParent({
        nameGenerator: DEFAULT_NAME_GENERATOR,
        categoryId: parent!.categoryId,
        parentId: channel.id,
        children: [],
        template,
      });

      parent = CustomVoice.parents.get(channel.id)!;
    }

    parent.template = template;

    interaction.logger.debug(
      `Updated template for parent channel ${channel.id} in guild ${interaction.guildId}.`
    );

    const LL = getLanguage(interaction);

    await interaction.reply({
      content: LL.SUCCESS_UPDATE_TEMPLATE(),
      ephemeral: true,
    });
  }

  @On({ event: 'voiceStateUpdate' })
  async onVoiceStateUpdateAsync([
    oldState,
    newState,
  ]: ArgsOf<'voiceStateUpdate'>) {
    const { client } = oldState;

    const voiceChannelJoined = !oldState.channelId && !!newState.channelId;
    const voiceChannelLeft = !!oldState.channelId && !newState.channelId;
    const voiceChannelMoved =
      !!oldState.channelId &&
      !!newState.channelId &&
      oldState.channelId !== newState.channelId;

    const subLogger = this.logger.getSubLogger({
      name: 'VoiceStateUpdate',
      prefix: [newState.id, newState.member?.id, newState.guild?.id],
    });

    subLogger.debug(
      `Received voice state update for ${newState.member?.user.tag} in guild ${newState.guild?.id}.`
    );

    // Handles when a user leaves a custom voice channel and checks if the
    // channel should be deleted (execute deletion validators).
    if (voiceChannelLeft || voiceChannelMoved) {
      if (!oldState.channel || !oldState.member) {
        subLogger.debug(
          `Expected oldState to have a "channel" and "member" but got "${oldState.channel}" and "${oldState.member}" instead.`
        );

        return;
      }

      if (oldState.channel && oldState.member) {
        const oldStateParent = CustomVoice.parents.find((p) =>
          p.children.some(
            (children) => children.channelId === oldState.channelId
          )
        );

        if (oldStateParent) {
          const childChannelObj = oldStateParent.children.find(
            (children) => children.channelId === oldState.channelId
          );

          if (!childChannelObj) {
            subLogger.error(
              `Expected to find channel ${oldState.channelId} in parent ${oldStateParent.parentId} but got "undefined" instead.`
            );

            return;
          }

          const childChannel = await client.channels.fetch(
            childChannelObj.channelId
          );

          if (childChannel?.type !== ChannelType.GuildVoice) {
            subLogger.error(
              `Expected channel ${childChannelObj} to be "GUILD_VOICE" but got "${childChannel?.type}" instead.`
            );

            return;
          }

          const shouldDelete = CustomVoice.deletionValidators.every(
            (validator) =>
              validator({
                channel: childChannel,
                member: oldState.member!,
                isOrphan: childChannelObj.isOrphan,
              })
          );

          subLogger.debug(
            `Deletion validator returned ${shouldDelete} for channel ${childChannelObj.channelId} in guild ${oldState.guild.id}.`
          );

          if (shouldDelete) {
            oldStateParent.children = oldStateParent.children.splice(
              oldStateParent.children.findIndex(
                (children) => children.channelId === childChannelObj.channelId
              ),
              1
            );

            await childChannel.delete();
          }
        }
      }
    }

    // If the member joined or moved to an parent channel, we create a new
    // private channel for it based on the parent channel configuration.
    if (voiceChannelJoined || voiceChannelMoved) {
      if (newState.channelId === null) {
        subLogger.warn(
          `Expected newState.channelId to be a string but got "null" instead. It should be handled by the previous if statement.`
        );

        return;
      }

      const newStateParent = CustomVoice.parents.get(newState.channelId);

      if (newStateParent && newState.member) {
        const newName = await newStateParent.nameGenerator({
          member: newState.member,
          count: newStateParent.children.length + 1,
          template: newStateParent.template,
        });

        const newChannel = await newState.guild.channels.create({
          name: newName,
          parent: newStateParent.categoryId,
          type: ChannelType.GuildVoice,
        });

        newStateParent.children.push({
          channelId: newChannel.id,
          ownerId: newState.member.id,
          isOrphan: false,
        });

        await newState.setChannel(newChannel);
      }
    }
  }
}

export default CustomVoice;
