import { PrismaClient } from '@prisma/client';
import { Discord, On } from 'discordx';
import { Logger } from 'tslog';

import CustomVoice from './custom-voice';

import type { ArgsOf, Client } from 'discordx';

@Discord()
class Controller {
  constructor(
    private readonly logger: Logger<unknown>,
    private readonly prisma: PrismaClient
  ) {}

  @On({ event: 'ready' })
  async onReady(_: ArgsOf<'ready'>, client: Client) {
    await client.initApplicationCommands();

    // This isn't inside CustomVoice's constructor because it's async and
    // it's only mounted when some command/event is executed.
    await CustomVoice.preloadFromPrismaAsync(
      this.prisma,
      this.logger.getSubLogger({ name: 'CustomVoice' })
    );

    this.logger.info(
      'Zutomayo is now running. Press CTRL + C to stop the process.'
    );
  }

  @On({ event: 'interactionCreate' })
  async onInteractionCreate(
    [interaction]: ArgsOf<'interactionCreate'>,
    client: Client
  ) {
    interaction.logger = this.logger.getSubLogger({
      name: 'InteractionCreate',
      prefix: [interaction.id, interaction.user.id, interaction.guild?.id],
    });

    await client.executeInteraction(interaction);
  }

  @On({ event: 'error' })
  async onError([error]: ArgsOf<'error'>, client: Client) {
    this.logger.error(error);
  }
}

export default Controller;
