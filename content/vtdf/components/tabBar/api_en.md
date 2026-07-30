## TabBar Props

| Name              | Type            | Default | Required | Description                            |
| ----------------- | --------------- | ------- | -------- | -------------------------------------- |
| labels            | `TabBarLabel[]` | `[]`    | Y        | Tab content group.                     |
| active            | `number`        | `0`     | N        | Index value of active tab.             |
| line              | `boolean`       | `false` | N        | Whether to show bottom line.           |
| lineW             | `number`        | `4`     | N        | Line width ratio of current tab width. |
| love              | `boolean`       | `false` | N        | Whether to enable care version.        |
| injClass          | `string`        | `''`    | N        | Inject CSS class for TabBar wrapper.   |
| tabInjClass       | `string`        | `''`    | N        | Inject CSS class for single tab.       |
| activeTabInjClass | `string`        | `''`    | N        | Inject CSS class for active tab.       |
| activeInjClass    | `string`        | `''`    | N        | Inject CSS class for bottom line.      |

## TabBarLabel Props

| Name       | Type                                 | Default | Required | Description      |
| ---------- | ------------------------------------ | ------- | -------- | ---------------- |
| text       | `string`                             | `''`    | N        | Tab text.        |
| icon       | [`Icon`](/components?nav=icon&tab=1) | -       | N        | Tab icon.        |
| activeIcon | [`Icon`](/components?nav=icon&tab=1) | -       | N        | Active tab icon. |

## TabBar Events

| Name   | Type                       | Parameters                     | Description                       |
| ------ | -------------------------- | ------------------------------ | --------------------------------- |
| change | `(active: number) => void` | `active` - Active TabBar index | Triggered when TabBar is clicked. |
