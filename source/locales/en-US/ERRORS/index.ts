import { mergeTranslations } from '@/locales/helpers';

export default mergeTranslations('ERRORS', {
  GUARD_IN_GUILD_ONLY: 'This command can only be used in a guild.',

  GUARD_IN_GUILD_ONLY_USER_MISSING_PERMISSIONS:
    'You do not have permission to use this command.',
  GUARD_IN_GUILD_ONLY_BOT_MISSING_PERMISSIONS:
    'I do not have permission to use this command.',

  PARENT_NOT_FOUND:
    'The category informed does not exist or is not accessible to me.',

  PARENT_ALREADY_CONFIGURED: 'The category informed is already configured.',
});
