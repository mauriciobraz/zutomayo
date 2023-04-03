# Zutomayo

![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![Github CI](https://github.com/mauriciobraz/zutomayo/actions/workflows/lint.yml/badge.svg)

## Getting Started

Clone the repository and install the dependencies using [PnPM](https://pnpm.io/):

```bash
git clone https://github.com/mauriciobraz/zutomayo.git
cd zutomayo
pnpm install
```

### Configuration

Clone the `.env.example` file and rename it to `.env`. Then, fill in the required fields:

```bash
cp .env.example .env
```

<details>
  <summary>Environment Variables</summary>

| Environment Variable | Required |
| -------------------- | -------- |
| `NODE_ENV`           | No       |
| `LOG_LEVEL`          | No       |
| `DISCORD_TOKEN`      | Yes      |
| `DATABASE_URL`       | Yes      |

</details>

### How Localization Works

The localization is done using the [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), read the documentation for more information. Basically, you can create a folder for each language you want to support, and then execute the following command to generate the types:

```bash
pnpm run typesafe-i18n
```

Don't forget to always use the [Discord's locales names](https://discord.com/developers/docs/reference#locales) for the language folders, otherwise the bot won't be able to organize the translations.

#### Translating Commands

Create a folder for the language you want to translate, and then create the same file structure as the [default one](source/locales/pt-BR/) and use the `mergeTranslations` helper function to merge the translations with the default ones. This function is located in the [`@locales/localization`](source/locales/helpers.ts#L15) file.

> If you want to use on the main file (eg. `en-US/index.ts`), you can use `*` as the namespace parameter, otherwise, you must use the namespace.

```ts
// source/locales/en-US/index.ts

import { mergeTranslations } from '@/locales/localization';

export default mergeTranslations('*', {
  // ...
});
```
