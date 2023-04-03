import { GuildMember } from 'discord.js';

import { getLanguage } from '@/libraries/localization';

import type { Interaction, PermissionsString } from 'discord.js';
import type { GuardFunction } from 'discordx';

export namespace GuildGuards {
  /** Guard that checks if the command was executed in a guild and replies with an error if it wasn't. */
  export function InGuild(): GuardFunction<Interaction> {
    return async (interaction, _client, next) => {
      if (!interaction.inGuild()) {
        if (interaction.isRepliable()) {
          const LL = getLanguage(interaction);

          await interaction[
            interaction.deferred || interaction.replied ? 'followUp' : 'reply'
          ]({ content: LL.ERRORS.GUARD_IN_GUILD_ONLY(), ephemeral: true });
        }

        return;
      }

      await next();
    };
  }

  export interface HasPermissionsOptions {
    /** Permissions to check for. */
    permissions: PermissionsString[];

    /** Whether to check if the user or/and the bot has the permissions. */
    checkPermissionsFor: 'Both' | 'Client' | 'User';
  }

  export function HasPermissions(
    options: HasPermissionsOptions
  ): GuardFunction<Interaction> {
    return async (interaction, client, next, data) => {
      if (!interaction.inGuild()) {
        throw new Error(
          'hasGuildPermissions() can only be used in guilds. Ensure inGuild() is used before this guard.'
        );
      }

      const guild = interaction.guild
        ? interaction.guild
        : await interaction.client.guilds.fetch(interaction.guildId);

      const member =
        interaction.member instanceof GuildMember
          ? interaction.member
          : await guild.members.fetch(interaction.member.user.id);

      const userHasPermissions = member.permissions.has(
        options.permissions,
        true
      );

      const botHasPermissions = guild.members.me?.permissions.has(
        options.permissions,
        true
      );

      const hasPermissions =
        options.checkPermissionsFor === 'Both'
          ? userHasPermissions && botHasPermissions
          : options.checkPermissionsFor === 'Client'
          ? botHasPermissions
          : userHasPermissions;

      if (!userHasPermissions || !botHasPermissions) {
        if (interaction.isRepliable()) {
          const LL = getLanguage(interaction);

          await interaction[
            interaction.deferred || interaction.replied ? 'followUp' : 'reply'
          ]({
            content:
              !hasPermissions && !userHasPermissions
                ? LL.ERRORS.GUARD_IN_GUILD_ONLY_USER_MISSING_PERMISSIONS()
                : LL.ERRORS.GUARD_IN_GUILD_ONLY_BOT_MISSING_PERMISSIONS(),
            ephemeral: true,
          });
        }

        return;
      }

      await next();
    };
  }
}
