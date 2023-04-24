import 'discord.js';
import { Logger } from 'tslog';

declare module 'discord.js' {
  /** Indicates that the interaction is cached. */
  type CachedType = 'cached' | 'raw';

  interface BaseInteraction {
    /** Custom instance of a logger for this interaction. */
    logger: Logger<unknown>;
  }
}
