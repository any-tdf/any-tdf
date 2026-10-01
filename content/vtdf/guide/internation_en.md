## Configuring Language Pack

VTDF defaults to Simplified Chinese. Use ConfigProvider at the application root to provide a locale. Mount Feedback once inside it when using functional feedback APIs.

```vue
<script setup lang="ts">
import { ConfigProvider, Feedback, TimePicker } from 'vtdf';
import { en_US } from 'vtdf/lang';
</script>

<template>
	<ConfigProvider :locale="en_US">
		<TimePicker />
		<Feedback />
	</ConfigProvider>
</template>
```

## ConfigProvider Props

| Name               | Type                 | Default            | Description                                                  |
| ------------------ | -------------------- | ------------------ | ------------------------------------------------------------ |
| locale             | `LangProps`          | `zh_CN`            | Component text.                                              |
| builtInIconLibrary | `BuiltInIconLibrary` | `remix`            | Built-in component icon library.                             |
| theme              | `SwitchThemeInput`   | `ANYTDF`           | Global theme when syncTheme is enabled.                      |
| mode               | `'primary'\|'dark'`  | `primary`          | Global light or dark mode.                                   |
| iconPath           | `string`             | `fonts/symbol.svg` | External SVG Symbol path; Icon defaults to fonts/symbol.svg. |
| syncTheme          | `boolean`            | `true`             | Synchronize theme and mode to the root element.              |

Replacing locale updates descendant components through Vue reactive provide/inject. A nested provider can supply a local locale; set its syncTheme to false to avoid resetting the global theme and mode. Feedback synchronizes its provider locale to the global functional feedback state.

Functional feedback has one global language configuration and does not infer a locale from the calling component. Keep one Feedback container and manage its locale centrally.

VTDF renders provider content through the default Vue slot.

Currently supported languages:

| Language                              | lang   |
| ------------------------------------- | ------ |
| Arabic                                | ar_EG  |
| Azerbaijani                           | az_AZ  |
| Bulgarian                             | bg_BG  |
| Bengali (Bangladesh)                  | bn_BD  |
| Catalan                               | ca_ES  |
| Czech                                 | cs_CZ  |
| Danish                                | da_DK  |
| German                                | de_DE  |
| Greek                                 | el_GR  |
| English                               | en_GB  |
| English (US)                          | en_US  |
| Spanish                               | es_ES  |
| Basque                                | eu_ES  |
| Estonian                              | et_EE  |
| Persian                               | fa_IR  |
| Finnish                               | fi_FI  |
| French (Belgium)                      | fr_BE  |
| French (Canada)                       | fr_CA  |
| French (France)                       | fr_FR  |
| Irish                                 | ga_IE  |
| Galician (Spain)                      | gl_ES  |
| Hebrew                                | he_IL  |
| Hindi                                 | hi_IN  |
| Croatian                              | hr_HR  |
| Hungarian                             | hu_HU  |
| Armenian                              | hy_AM  |
| Indonesian                            | id_ID  |
| Italian                               | it_IT  |
| Icelandic                             | is_IS  |
| Japanese                              | ja_JP  |
| Georgian                              | ka_GE  |
| Khmer                                 | km_KH  |
| Kurdish (Northern)                    | kmr_IQ |
| Kannada                               | kn_IN  |
| Kazakh                                | kk_KZ  |
| Korean                                | ko_KR  |
| Lithuanian                            | lt_LT  |
| Latvian                               | lv_LV  |
| Macedonian                            | mk_MK  |
| Malayalam                             | ml_IN  |
| Mongolian                             | mn_MN  |
| Malay (Malaysia)                      | ms_MY  |
| Norwegian                             | nb_NO  |
| Nepali                                | ne_NP  |
| Dutch (Belgium)                       | nl_BE  |
| Dutch                                 | nl_NL  |
| Polish                                | pl_PL  |
| Portuguese (Brazil)                   | pt_BR  |
| Portuguese                            | pt_PT  |
| Romanian                              | ro_RO  |
| Russian                               | ru_RU  |
| Sinhalese                             | si_LK  |
| Slovak                                | sk_SK  |
| Serbian                               | sr_RS  |
| Slovenian                             | sl_SI  |
| Swedish                               | sv_SE  |
| Tamil                                 | ta_IN  |
| Thai                                  | th_TH  |
| Turkish                               | tr_TR  |
| Turkmen                               | tk_TK  |
| Urdu (Pakistan)                       | ur_PK  |
| Ukrainian                             | uk_UA  |
| Vietnamese                            | vi_VN  |
| Simplified Chinese                    | zh_CN  |
| Traditional Chinese (China Hong Kong) | zh_HK  |
| Traditional Chinese (China Taiwan)    | zh_TW  |

> The multilingual files are translated by machine. If there are any inaccuracies, please submit a PR for correction.

## Adding a Language Pack

If you cannot find the language pack you need, you are welcome to create a new language pack based on the [Chinese language pack](https://github.com/any-tdf/any-tdf/blob/main/packages/common/src/lang/zh_CN.ts) or [English language pack](https://github.com/any-tdf/any-tdf/blob/main/packages/common/src/lang/en_US.ts) and submit it as a Pull Request. [Language code table](http://www.lingoes.net/en/translator/langcode.htm)

The basic steps are as follows:

- Please fork the [Any TDF](https://github.com/any-tdf/any-tdf) repository. If you have already forked it, please sync the latest code from the main repository.
- Clone your repository to your local machine.
- Add a complete `LangProps` language pack under `packages/common/src/lang` and export it from `packages/common/src/lang/index.ts` so all three public language entries expose it.
- Update the Chinese and English internationalization guide language lists in all three sites, keeping entries sorted by the language code.
- Commit the modifications to your repository and then submit a Pull Request to the main repository.
- Once the Pull Request is approved during the review process, it will be merged into the main repository and a new version will be released on npm.
