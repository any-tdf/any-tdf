## Pagination Props

| Name             | Type                                                  | Default                                          | Required | Description                                  |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------ | -------- | -------------------------------------------- |
| total            | `number`                                              | `0`                                              | Y        | Total number of items.                       |
| pageSize         | `number`                                              | `10`                                             | N        | Number of items per page.                    |
| current          | `number`                                              | `1`                                              | N        | Current page number.                         |
| maxShowPage      | `5\|7\|9\|11`                                         | `7`                                              | N        | Maximum number of page numbers to display.   |
| radius           | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`                                           | N        | Border radius style.                         |
| type             | `'border'\|'block'\|'bold'`                           | `'bold'`                                         | N        | Highlighted page number style.               |
| pageCol          | `number`                                              | `3`                                              | N        | Number of columns for omitted page numbers.  |
| showNextOmitPage | `boolean`                                             | `false`                                          | N        | Whether to show omitted page numbers after.  |
| showPreOmitPage  | `boolean`                                             | `false`                                          | N        | Whether to show omitted page numbers before. |
| injClass         | `string`                                              | `''`                                             | N        | Inject CSS class name.                       |
| noDataText       | `string`                                              | Current language's common.noData                 | N        | Text to display when no data.                |
| onePageText      | `string`                                              | Current language's pagination.defaultOnlyOnePage | N        | Text to display when only one page.          |
| continuous       | `boolean`                                             | `false`                                          | N        | Whether to use continuous mode.              |

## Pagination Events

| Name     | Type                        | Parameters                    | Description                            |
| -------- | --------------------------- | ----------------------------- | -------------------------------------- |
| onchange | `(current: number) => void` | current - Current page number | Triggered when page number changes.    |
| onnext   | `(current: number) => void` | current - Current page number | Triggered when clicking next page.     |
| onpre    | `(current: number) => void` | current - Current page number | Triggered when clicking previous page. |
