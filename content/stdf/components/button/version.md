<!-- "[!tag|A|0|]"表示一个 tag，其中 A 表示新增，B 表示 BUG，O 表示优化，第二个数字表示 BUG 等级，0 暂无意义。 -->
<!-- "[!issue|dufu1991|]"表示一个 issue 提出者，其中 dufu1991 是提出者的 id。 -->
<!-- "[!contribute|dufu1991|]"表示一个贡献者，其中 eric1932 是贡献者的 id。 -->

<!-- 记得带上版本号和更新日期，以下是一个示例：


## 0.0.1

-   [!tag|B|1|] 严重 BUG。[!contribute|dufu1991|][!issue|dufu1991|]
-   [!tag|B|2|] 一般 BUG。
-   [!tag|B|3|] 轻微 BUG。
-   [!tag|O|0|] 优化。
-   [!tag|A|0|] 新增。
 -->

## 2.0.0

- [!tag|A|0|] 新增 `border` 属性用于边框风格，替代原 `line` 属性。
- [!tag|O|0|] `fill` 选项调整为 `lineState` 与 `textState`，原 `lineTheme` 与 `textTheme` 迁移为状态版。
- [!tag|O|0|] 移除 `group` 属性，按钮组改用 ButtonGroup 组件。
- [!tag|O|0|] `radius` 选项补充更多等级并支持空值。

## 1.1.0

- [!tag|A|0|] 新增 `iconPosition` 属性，支持设置图标位置。

## 1.0.4

- [!tag|A|0|] 新增 `type` 属性 [PR#43](https://github.com/any-tdf/stdf/pull/43)，相关 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button#type)。[!contribute|arithefirst|]

## 0.5.2

- [!tag|O|0|]调整 icon 与 loading 参数，使其可同时存在。

## 0.5.1

- [!tag|A|0|]支持通过传入 iconLoading 参数实现在按钮内容前显示图标或者加载。
