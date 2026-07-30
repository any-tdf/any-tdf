## 使用场景

图片预览组件用于在全屏模式下预览图片，支持手势缩放、滑动切换等功能。

## 手势操作

- **单指左右滑动**：切换图片
- **双指捏合**：缩放图片

## 导航图标

默认显示左右导航图标，支持点击切换图片。可通过 `showNavigation` 属性隐藏，通过 `navigationPosition` 属性设置位置：

- `center`（默认）：垂直居中
- `bottom`：底部位置

## 图片列表

`images` 属性支持两种格式：

1. 字符串数组（图片地址）

```javascript
const images = ['/image1.jpg', '/image2.jpg'];
```

2. 对象数组（包含更多信息）

```javascript
const images = [
	{ url: '/image1.jpg', alt: '图片描述 1' },
	{ url: '/image2.jpg', alt: '图片描述 2', thumbnail: '/thumb1.jpg' }
];
```

## 指示器类型

- `number`：数字指示器，显示当前索引和总数
- `dot`：圆点指示器
- `null`：不显示指示器

## 自定义内容

通过 `children` Snippet 可以自定义图片下方的内容区域，常用于显示图片描述、操作按钮等。

## 关闭方式

- **点击关闭按钮**：`closable={true}` 时显示
- **点击蒙层**：`maskClosable={true}` 时有效（默认禁用）

## 注意事项

- 组件会阻止默认的页面滚动行为
- 缩放状态下点击蒙层不会关闭预览
- 建议配合 `ImageList` 组件使用
