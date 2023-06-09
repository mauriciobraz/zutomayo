import { BaseTranslation } from 'typesafe-i18n';

export default {
  CUSTOMVOICE_NAME: 'voz',
  CUSTOMVOICE_DESCRIPTION: 'Comandos relacionados a canais de voz privados.',

  CUSTOMVOICE_OPTION_CHANNEL_NAME: 'canal',
  CUSTOMVOICE_OPTION_CHANNEL_DESCRIPTION: 'Canal de voz para configurar.',

  CUSTOMVOICE_SETUP_NAME: 'configurar',
  CUSTOMVOICE_SETUP_DESCRIPTION: 'Configura um canal de voz privado.',

  CUSTOMVOICE_SETUP_OPTION_CATEGORY_NAME: 'categoria',
  CUSTOMVOICE_SETUP_OPTION_CATEGORY_DESCRIPTION:
    'Categoria para criar canais de voz privados.',

  CUSTOMVOICE_SETUP_OPTION_TEMPLATE_NAME: 'modelo',
  CUSTOMVOICE_SETUP_OPTION_TEMPLATE_DESCRIPTION:
    'Variáveis disponíveis: {USER} (nome do usuário), {COUNT} (número de canais de voz existentes).',

  CUSTOMVOICE_UPDATETEMPLATE_NAME: 'atualizar-nome',
  CUSTOMVOICE_UPDATETEMPLATE_DESCRIPTION:
    'Atualiza o modelo de nome de um canal de voz privado.',

  CUSTOMVOICE_DELETE_NAME: 'deletar',
  CUSTOMVOICE_DELETE_DESCRIPTION: 'Deleta um canal de voz privado.',
} as BaseTranslation;
