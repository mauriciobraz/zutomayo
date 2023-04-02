import '@total-typescript/ts-reset';

import type { DotenvType } from '../constants/dotenv';
import type { Object } from 'ts-toolbelt';

declare global {
  /** Utility type to add a logger to an object (e.g. an interaction) */
  type Loggable<T extends object> = T & {
    logger: Logger;
  };

  namespace NodeJS {
    interface ProcessEnv
      extends NodeJS.ProcessEnv,
        Object.Update<DotenvType, keyof DotenvType, string> {}
  }
}

export {};
