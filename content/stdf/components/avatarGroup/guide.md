## 基础用法

头像组用于展示多个头像的叠加效果，常见于群聊头像、评论者列表等场景。传入由 Avatar Props 组成的数组即可。

## 紧凑程度

通过 `compact` 参数控制头像之间的重叠程度，数值越大越紧凑。默认值为 5。

## 顶层内容

默认顶层显示头像总数，可通过 `top` 参数控制顶层显示内容：

- `'totle'`：显示头像总数（默认）
- `'add'`：显示添加图标
- `null`：不显示顶层
- `Snippet`：自定义顶层内容

## 反向排列

设置 `reverse` 为 `true` 可以反转头像的排列顺序和层叠方向。

## 最大显示数量

通过 `max` 参数限制最多显示的头像数量，超出的数量会在顶层显示。

## injClass

通过 `injClass` 参数可以为头像组注入 CSS 类名，一般用于当默认边框颜色与背景色不统一时传入 ring 的颜色使其统一。

若注入的 class 没生效，请在注入的 class 名称前添加"!"，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
