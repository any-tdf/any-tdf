## IndexBar Props

| Name          | Type                                                  | Default | Required | Description                                       |
| ------------- | ----------------------------------------------------- | ------- | -------- | ------------------------------------------------- |
| data          | `IndexBarItemProps<T>[]`                              | `[]`    | Y        | Array of index data.                              |
| current       | `number`                                              | `0`     | N        | Currently active index value.                     |
| top           | `number`                                              | `0`     | N        | Distance from index content area to document top. |
| height        | `number`                                              | `100`   | Y        | Height of index content area.                     |
| radius        | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'md'`  | N        | Border radius style.                              |
| scrollAlign   | `boolean`                                             | `true`  | N        | Whether to enable scroll auto-alignment.          |
| titleInjClass | `string`                                              | `''`    | N        | Inject CSS for index group title.                 |
| textInjClass  | `string`                                              | `''`    | N        | Inject CSS for index item text.                   |

## IndexBar Children

| Name     | Type                                                                                           | Parameters                                                                                           | Description                                                   |
| -------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| children | `(child: T, childIndex: number, group: IndexBarItemProps<T>, groupIndex: number) => ReactNode` | child - item data<br />childIndex - item index<br />group - group data<br />groupIndex - group index | Custom child item content, renders as string if not provided. |

## IndexBar Events

| Name         | Type                                                                                 | Parameters                                                                                                                                                                | Description                                                                        |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| onClickChild | `(index: number, group: IndexBarItemProps<T>, childIndex: number, child: T) => void` | index - Parent group index of clicked item<br />group - Parent group content of clicked item<br />childIndex - Index of clicked item<br />child - Content of clicked item | Triggered when clicking an index item.                                             |
| onclickChild | `(index: number, group: IndexBarItemProps<T>, childIndex: number, child: T) => void` | index - Parent group index of clicked item<br />group - Parent group content of clicked item<br />childIndex - Index of clicked item<br />child - Content of clicked item | Triggered when clicking an index item. Lowercase event alias compatible with STDF. |

## IndexBarItemProps

| Name   | Type     | Default | Required | Description                                 |
| ------ | -------- | ------- | -------- | ------------------------------------------- |
| index  | `string` | `''`    | Y        | Index value.                                |
| title  | `string` | `''`    | Y        | Title.                                      |
| child  | `T[]`    | `[]`    | Y        | Array of child items, T defaults to string. |
| height | `number` | `0`     | N        | Height of child items (auto-bound).         |

## Generics

IndexBar supports generic type `T`, which defaults to `string`. When you need to pass complex data structures, you can specify the generic type:

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
			{ name: 'Alice', phone: '138****1234' },
			{ name: 'Andy', phone: '139****5678' }
		]
	}
];
```

Use `children` render props for custom rendering:

```tsx
<IndexBar data={contactList} height={400}>
	{(item) => (
		<div className="flex items-center gap-3">
			<div className="h-10 w-10 rounded-full bg-primary/20">{item.name[0]}</div>
			<div>
				<div>{item.name}</div>
				<div className="text-xs">{item.phone}</div>
			</div>
		</div>
	)}
</IndexBar>
```
