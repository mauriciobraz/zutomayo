// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType & DisallowNamespaces
export type BaseLocale = 'pt-BR'

export type Locales =
	| 'en-US'
	| 'pt-BR'

export type Translation = RootTranslation & DisallowNamespaces

export type Translations = RootTranslation &
{
	ERRORS: NamespaceERRORSTranslation,
	SLASH: NamespaceSLASHTranslation
}

type RootTranslation = {
	/**
	 * C​o​n​f​i​g​u​r​a​ç​ã​o​ ​c​o​n​c​l​u​í​d​a​ ​c​o​m​ ​s​u​c​e​s​s​o​!
	 */
	SUCCESS_SETUP: string
	/**
	 * C​a​n​a​l​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​ ​e​x​c​l​u​í​d​o​ ​c​o​m​ ​s​u​c​e​s​s​o​!
	 */
	SUCCESS_DELETE: string
	/**
	 * M​o​d​e​l​o​ ​d​e​ ​n​o​m​e​ ​a​t​u​a​l​i​z​a​d​o​ ​c​o​m​ ​s​u​c​e​s​s​o​!
	 */
	SUCCESS_UPDATE_TEMPLATE: string
}

export type NamespaceERRORSTranslation = {
	/**
	 * E​s​t​e​ ​c​o​m​a​n​d​o​ ​s​ó​ ​p​o​d​e​ ​s​e​r​ ​u​s​a​d​o​ ​e​m​ ​s​e​r​v​i​d​o​r​e​s​.
	 */
	GUARD_IN_GUILD_ONLY: string
	/**
	 * V​o​c​ê​ ​n​ã​o​ ​t​e​m​ ​p​e​r​m​i​s​s​ã​o​ ​p​a​r​a​ ​u​s​a​r​ ​e​s​t​e​ ​c​o​m​a​n​d​o​.
	 */
	GUARD_IN_GUILD_ONLY_USER_MISSING_PERMISSIONS: string
	/**
	 * E​u​ ​n​ã​o​ ​t​e​n​h​o​ ​p​e​r​m​i​s​s​ã​o​ ​p​a​r​a​ ​u​s​a​r​ ​e​s​t​e​ ​c​o​m​a​n​d​o​.
	 */
	GUARD_IN_GUILD_ONLY_BOT_MISSING_PERMISSIONS: string
	/**
	 * N​ã​o​ ​f​o​i​ ​p​o​s​s​í​v​e​l​ ​e​n​c​o​n​t​r​a​r​ ​o​ ​c​a​n​a​l​ ​e​s​p​e​c​i​f​i​c​a​d​o​.​ ​V​e​r​i​f​i​q​u​e​ ​s​e​ ​e​l​a​ ​e​x​i​s​t​e​ ​e​ ​s​e​ ​e​u​ ​t​e​n​h​o​ ​p​e​r​m​i​s​s​ã​o​ ​p​a​r​a​ ​v​e​r​ ​e​l​a​.
	 */
	PARENT_NOT_FOUND: string
	/**
	 * E​s​t​e​ ​c​a​n​a​l​ ​j​á​ ​e​s​t​á​ ​c​o​n​f​i​g​u​r​a​d​o​ ​c​o​m​o​ ​u​m​ ​c​a​n​a​l​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​.
	 */
	PARENT_ALREADY_CONFIGURED: string
}

export type NamespaceSLASHTranslation = {
	/**
	 * v​o​z
	 */
	CUSTOMVOICE_NAME: string
	/**
	 * C​o​m​a​n​d​o​s​ ​r​e​l​a​c​i​o​n​a​d​o​s​ ​a​ ​c​a​n​a​i​s​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​s​.
	 */
	CUSTOMVOICE_DESCRIPTION: string
	/**
	 * c​a​n​a​l
	 */
	CUSTOMVOICE_OPTION_CHANNEL_NAME: string
	/**
	 * C​a​n​a​l​ ​d​e​ ​v​o​z​ ​p​a​r​a​ ​c​o​n​f​i​g​u​r​a​r​.
	 */
	CUSTOMVOICE_OPTION_CHANNEL_DESCRIPTION: string
	/**
	 * c​o​n​f​i​g​u​r​a​r
	 */
	CUSTOMVOICE_SETUP_NAME: string
	/**
	 * C​o​n​f​i​g​u​r​a​ ​u​m​ ​c​a​n​a​l​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​.
	 */
	CUSTOMVOICE_SETUP_DESCRIPTION: string
	/**
	 * c​a​t​e​g​o​r​i​a
	 */
	CUSTOMVOICE_SETUP_OPTION_CATEGORY_NAME: string
	/**
	 * C​a​t​e​g​o​r​i​a​ ​p​a​r​a​ ​c​r​i​a​r​ ​c​a​n​a​i​s​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​s​.
	 */
	CUSTOMVOICE_SETUP_OPTION_CATEGORY_DESCRIPTION: string
	/**
	 * m​o​d​e​l​o
	 */
	CUSTOMVOICE_SETUP_OPTION_TEMPLATE_NAME: string
	/**
	 * V​a​r​i​á​v​e​i​s​ ​d​i​s​p​o​n​í​v​e​i​s​:​ ​{​U​S​E​R​}​ ​(​n​o​m​e​ ​d​o​ ​u​s​u​á​r​i​o​)​,​ ​{​C​O​U​N​T​}​ ​(​n​ú​m​e​r​o​ ​d​e​ ​c​a​n​a​i​s​ ​d​e​ ​v​o​z​ ​e​x​i​s​t​e​n​t​e​s​)​.
	 * @param {unknown} COUNT
	 * @param {unknown} USER
	 */
	CUSTOMVOICE_SETUP_OPTION_TEMPLATE_DESCRIPTION: RequiredParams<'COUNT' | 'USER'>
	/**
	 * a​t​u​a​l​i​z​a​r​-​n​o​m​e
	 */
	CUSTOMVOICE_UPDATETEMPLATE_NAME: string
	/**
	 * A​t​u​a​l​i​z​a​ ​o​ ​m​o​d​e​l​o​ ​d​e​ ​n​o​m​e​ ​d​e​ ​u​m​ ​c​a​n​a​l​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​.
	 */
	CUSTOMVOICE_UPDATETEMPLATE_DESCRIPTION: string
	/**
	 * d​e​l​e​t​a​r
	 */
	CUSTOMVOICE_DELETE_NAME: string
	/**
	 * D​e​l​e​t​a​ ​u​m​ ​c​a​n​a​l​ ​d​e​ ​v​o​z​ ​p​r​i​v​a​d​o​.
	 */
	CUSTOMVOICE_DELETE_DESCRIPTION: string
}

export type Namespaces =
	| 'ERRORS'
	| 'SLASH'

type DisallowNamespaces = {
	/**
	 * reserved for 'ERRORS'-namespace\
	 * you need to use the `./ERRORS/index.ts` file instead
	 */
	ERRORS?: "[typesafe-i18n] reserved for 'ERRORS'-namespace. You need to use the `./ERRORS/index.ts` file instead."

	/**
	 * reserved for 'SLASH'-namespace\
	 * you need to use the `./SLASH/index.ts` file instead
	 */
	SLASH?: "[typesafe-i18n] reserved for 'SLASH'-namespace. You need to use the `./SLASH/index.ts` file instead."
}

export type TranslationFunctions = {
	/**
	 * Configuração concluída com sucesso!
	 */
	SUCCESS_SETUP: () => LocalizedString
	/**
	 * Canal de voz privado excluído com sucesso!
	 */
	SUCCESS_DELETE: () => LocalizedString
	/**
	 * Modelo de nome atualizado com sucesso!
	 */
	SUCCESS_UPDATE_TEMPLATE: () => LocalizedString
	ERRORS: {
		/**
		 * Este comando só pode ser usado em servidores.
		 */
		GUARD_IN_GUILD_ONLY: () => LocalizedString
		/**
		 * Você não tem permissão para usar este comando.
		 */
		GUARD_IN_GUILD_ONLY_USER_MISSING_PERMISSIONS: () => LocalizedString
		/**
		 * Eu não tenho permissão para usar este comando.
		 */
		GUARD_IN_GUILD_ONLY_BOT_MISSING_PERMISSIONS: () => LocalizedString
		/**
		 * Não foi possível encontrar o canal especificado. Verifique se ela existe e se eu tenho permissão para ver ela.
		 */
		PARENT_NOT_FOUND: () => LocalizedString
		/**
		 * Este canal já está configurado como um canal de voz privado.
		 */
		PARENT_ALREADY_CONFIGURED: () => LocalizedString
	}
	SLASH: {
		/**
		 * voz
		 */
		CUSTOMVOICE_NAME: () => LocalizedString
		/**
		 * Comandos relacionados a canais de voz privados.
		 */
		CUSTOMVOICE_DESCRIPTION: () => LocalizedString
		/**
		 * canal
		 */
		CUSTOMVOICE_OPTION_CHANNEL_NAME: () => LocalizedString
		/**
		 * Canal de voz para configurar.
		 */
		CUSTOMVOICE_OPTION_CHANNEL_DESCRIPTION: () => LocalizedString
		/**
		 * configurar
		 */
		CUSTOMVOICE_SETUP_NAME: () => LocalizedString
		/**
		 * Configura um canal de voz privado.
		 */
		CUSTOMVOICE_SETUP_DESCRIPTION: () => LocalizedString
		/**
		 * categoria
		 */
		CUSTOMVOICE_SETUP_OPTION_CATEGORY_NAME: () => LocalizedString
		/**
		 * Categoria para criar canais de voz privados.
		 */
		CUSTOMVOICE_SETUP_OPTION_CATEGORY_DESCRIPTION: () => LocalizedString
		/**
		 * modelo
		 */
		CUSTOMVOICE_SETUP_OPTION_TEMPLATE_NAME: () => LocalizedString
		/**
		 * Variáveis disponíveis: {USER} (nome do usuário), {COUNT} (número de canais de voz existentes).
		 */
		CUSTOMVOICE_SETUP_OPTION_TEMPLATE_DESCRIPTION: (arg: { COUNT: unknown, USER: unknown }) => LocalizedString
		/**
		 * atualizar-nome
		 */
		CUSTOMVOICE_UPDATETEMPLATE_NAME: () => LocalizedString
		/**
		 * Atualiza o modelo de nome de um canal de voz privado.
		 */
		CUSTOMVOICE_UPDATETEMPLATE_DESCRIPTION: () => LocalizedString
		/**
		 * deletar
		 */
		CUSTOMVOICE_DELETE_NAME: () => LocalizedString
		/**
		 * Deleta um canal de voz privado.
		 */
		CUSTOMVOICE_DELETE_DESCRIPTION: () => LocalizedString
	}
}

export type Formatters = {}
