## 配置语言包

STDF 组件使用 Svelte 的 [Context](https://svelte.dev/docs/svelte/context) 实现国际化文案配置，默认配置是中文简体。一般在应用的入口如 `App.svelte` 或 `+layout.svelte` 中配置 Context，例如：

```svelte
<!-- App.svelte/+layout.svelte -->
<script>
	import { setContext } from 'svelte'; // 引入 setContext
	import { en_US } from 'stdf/lang'; // 导入语言文件

	setContext('STDF_lang', en_US); // 设置语言
</script>
```

此组件的所有子孙组件（包含了 STDF 组件）都可以通过 `getContext('STDF_lang')` 获取到当前语言配置。更加灵活的是，甚至可以在应用内的某部分配置另一种语言。

注意 **Context 的切换不是响应式的**，一般应用中语言的切换也不需要实时响应。

目前支持以下语言：

| 语言                 | lang   |
| -------------------- | ------ |
| 阿拉伯语             | ar_EG  |
| 阿塞拜疆语           | az_AZ  |
| 保加利亚语           | bg_BG  |
| 孟加拉语（孟加拉国） | bn_BD  |
| 加泰罗尼亚语         | ca_ES  |
| 捷克语               | cs_CZ  |
| 丹麦语               | da_DK  |
| 德语                 | de_DE  |
| 希腊语               | el_GR  |
| 英语                 | en_GB  |
| 英语（美式）         | en_US  |
| 西班牙语             | es_ES  |
| 巴斯克语             | eu_ES  |
| 爱沙尼亚语           | et_EE  |
| 波斯语               | fa_IR  |
| 芬兰语               | fi_FI  |
| 法语（比利时）       | fr_BE  |
| 法语（加拿大）       | fr_CA  |
| 法语（法国）         | fr_FR  |
| 爱尔兰语             | ga_IE  |
| 加利西亚语（西班牙） | gl_ES  |
| 希伯来语             | he_IL  |
| 印地语               | hi_IN  |
| 克罗地亚语           | hr_HR  |
| 匈牙利语             | hu_HU  |
| 亚美尼亚             | hy_AM  |
| 印度尼西亚语         | id_ID  |
| 意大利语             | it_IT  |
| 冰岛语               | is_IS  |
| 日语                 | ja_JP  |
| 格鲁吉亚语           | ka_GE  |
| 高棉语               | km_KH  |
| 北库尔德语           | kmr_IQ |
| 卡纳达语             | kn_IN  |
| 哈萨克语             | kk_KZ  |
| 韩语/朝鲜语          | ko_KR  |
| 立陶宛语             | lt_LT  |
| 拉脱维亚语           | lv_LV  |
| 马其顿语             | mk_MK  |
| 马拉雅拉姆语         | ml_IN  |
| 蒙古语               | mn_MN  |
| 马来语 (马来西亚)    | ms_MY  |
| 挪威语               | nb_NO  |
| 尼泊尔语             | ne_NP  |
| 荷兰语（比利时）     | nl_BE  |
| 荷兰语               | nl_NL  |
| 波兰语               | pl_PL  |
| 葡萄牙语 (巴西)      | pt_BR  |
| 葡萄牙语             | pt_PT  |
| 罗马尼亚语           | ro_RO  |
| 俄罗斯语             | ru_RU  |
| 僧伽罗语             | si_LK  |
| 斯洛伐克语           | sk_SK  |
| 塞尔维亚语           | sr_RS  |
| 斯洛文尼亚语         | sl_SI  |
| 瑞典语               | sv_SE  |
| 泰米尔语             | ta_IN  |
| 泰语                 | th_TH  |
| 土耳其语             | tr_TR  |
| 土库曼               | tk_TK  |
| 乌尔都语 (巴基斯坦)  | ur_PK  |
| 乌克兰语             | uk_UA  |
| 越南语               | vi_VN  |
| 简体中文             | zh_CN  |
| 繁体中文（中国香港） | zh_HK  |
| 繁体中文（中国台湾） | zh_TW  |

> 多语言文件由机器翻译，如果有不准确的地方，请提交 PR 进行修正。

## 增加语言包

如果找不到你需要的语言包，欢迎你在 [中文语言包](https://github.com/any-tdf/any-tdf/blob/main/packages/common/src/lang/zh_CN.ts) 或 [英文语言包](https://github.com/any-tdf/any-tdf/blob/main/packages/common/src/lang/en_US.ts) 的基础上创建一个新的语言包，并发一个 Pull Request。[语言对照表](http://www.lingoes.net/en/translator/langcode.htm)

基本步骤如下：

- 请先 fork 一份 [Any TDF](https://github.com/any-tdf/any-tdf) 代码到自己的仓库，如果已经 fork 过，请同步主仓库的最新代码。
- 克隆你的仓库至本地。
- 在 `packages/common/src/lang` 文件夹中增加语言包。
- （可选）更新文档，在 `content/stdf/guide` 文件夹更新 [internation.md](https://github.com/any-tdf/any-tdf/edit/main/content/stdf/guide/internation.md) 和 [internation_en.md](https://github.com/any-tdf/any-tdf/edit/main/content/stdf/guide/internation_en.md) 文件，请在语言列表中按照 `lang` 的字母顺序更新。
- 提交修改内容至你的仓库，然后提 Pull Request 到主仓库。
- Pull Request 会在 Review 通过后被合并到主仓库，并发布新版本至 npm。
