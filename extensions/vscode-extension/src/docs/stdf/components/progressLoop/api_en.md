## ProgressLoop Props

| Name          | Type                                 | Default | Required | Description                                      |
| ------------- | ------------------------------------ | ------- | -------- | ------------------------------------------------ |
| percent       | `number`                             | `66`    | N        | Percentage value.                                |
| strokeWidth   | `number`                             | `2`     | N        | Width of the circular ring.                      |
| butt          | `boolean`                            | `false` | N        | Whether the endpoints are square.                |
| reverse       | `boolean`                            | `false` | N        | Whether to reverse direction (counterclockwise). |
| duration      | `'150'\|'300'\|'500'\|'700'\|'1000'` | `'300'` | N        | Animation transition duration.                   |
| gradient      | `[string,string]\|null`              | `[]`    | N        | Gradient colors, array of start and end colors.  |
| injClass      | `String`                             | `''`    | N        | Injected class name for active progress ring.    |
| trackInjClass | `String`                             | `''`    | N        | Injected class name for track ring.              |

## ProgressLoop Snippets

| Name     | Type                                                                | Params | Description                       |
| -------- | ------------------------------------------------------------------- | ------ | --------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Renders text content when passed. |
