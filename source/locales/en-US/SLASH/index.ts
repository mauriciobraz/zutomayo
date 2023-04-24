import { mergeTranslations } from '@/locales/helpers';

export default mergeTranslations('SLASH', {
  CUSTOMVOICE_NAME: 'voice',
  CUSTOMVOICE_DESCRIPTION: 'Custom voice channel commands.',

  CUSTOMVOICE_OPTION_CHANNEL_NAME: 'channel',
  CUSTOMVOICE_OPTION_CHANNEL_DESCRIPTION: 'Voice channel to setup.',

  CUSTOMVOICE_SETUP_NAME: 'setup',
  CUSTOMVOICE_SETUP_DESCRIPTION: 'Setup a private voice channel.',

  CUSTOMVOICE_SETUP_OPTION_CATEGORY_NAME: 'category',
  CUSTOMVOICE_SETUP_OPTION_CATEGORY_DESCRIPTION:
    'Category to create the private voice channel.',

  CUSTOMVOICE_SETUP_OPTION_TEMPLATE_NAME: 'template',
  CUSTOMVOICE_SETUP_OPTION_TEMPLATE_DESCRIPTION:
    'Available variables: {USER} (user name), {COUNT} (number of existing voice channels).',

  CUSTOMVOICE_UPDATETEMPLATE_NAME: 'update-name',
  CUSTOMVOICE_UPDATETEMPLATE_DESCRIPTION:
    'Update the name template of a private voice channel.',

  CUSTOMVOICE_DELETE_NAME: 'delete',
  CUSTOMVOICE_DELETE_DESCRIPTION: 'Delete a private voice channel.',
});
