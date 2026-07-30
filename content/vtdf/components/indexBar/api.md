## IndexBar Props

| 名称          | 类型                                                  | 默认值 | 必传 | 说明                             |
| ------------- | ----------------------------------------------------- | ------ | ---- | -------------------------------- |
| data          | `IndexBarItemProps<T>[]`                              | `[]`   | Y    | 索引数据组成的数组。             |
| current       | `number`                                              | `0`    | N    | 当前激活的索引值。               |
| top           | `number`                                              | `0`    | N    | 索引内容区域距离文档顶部的距离。 |
| height        | `number`                                              | `100`  | Y    | 索引内容区域高度。               |
| radius        | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'md'` | N    | 圆角风格。                       |
| scrollAlign   | `boolean`                                             | `true` | N    | 是否开启滚动自动对齐。           |
| titleInjClass | `string`                                              | `''`   | N    | 索引组标题注入 CSS。             |
| textInjClass  | `string`                                              | `''`   | N    | 索引项文本注入 CSS。             |

## IndexBar Children

| 名称     | 类型                                                                                          | 参数                                                                                     | 说明                                 |
| -------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| children | `(child: T, childIndex: number, group: IndexBarItemProps<T>, groupIndex: number) => Vue Slot` | child - 子项内容<br />childIndex - 子项索引<br />group - 组数据<br />groupIndex - 组索引 | 自定义子项内容，不传时按字符串渲染。 |

## IndexBar Events

| 名称        | 类型                                                                                 | 参数                                                                                                                | 描述               |
| ----------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------ |
| click-child | `(index: number, group: IndexBarItemProps<T>, childIndex: number, child: T) => void` | index - 点击项的父级组索引值<br />group - 点击项的父级组内容<br />childIndex - 点击项索引值<br />child - 点击项内容 | 点击索引项时触发。 |

## IndexBarItemProps

| 名称   | 类型     | 默认值 | 必传 | 说明                              |
| ------ | -------- | ------ | ---- | --------------------------------- |
| index  | `string` | `''`   | Y    | 索引值。                          |
| title  | `string` | `''`   | Y    | 标题。                            |
| child  | `T[]`    | `[]`   | Y    | 子项组成的数组，T 默认为 string。 |
| height | `number` | `0`    | N    | 子项高度（自动绑定）。            |

## 泛型说明

IndexBar 支持泛型 `T`，默认为 `string`。当需要传入复杂数据结构时，可以指定泛型类型：

```typescript
type ContactItem = {
	name: string;
	phone: string;
};

const contactList: IndexBarItemProps<ContactItem>[] = [
	{
		index: 'A',
		title: 'A',
		child: [
			{ name: '阿里', phone: '138****1234' },
			{ name: '安迪', phone: '139****5678' }
		]
	}
];
```

配合默认 Vue Slot 自定义渲染：

```vue
<IndexBar :data="contactList" :height="400">
	<template #default="{ item }">
		<div class="flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
				{{ item.name[0] }}
			</div>
			<div>
				<div>{{ item.name }}</div>
				<div class="text-xs">{{ item.phone }}</div>
			</div>
		</div>
	</template>
</IndexBar>
```
