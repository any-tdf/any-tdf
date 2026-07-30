## Basic Usage

Set the value to display via the `value` property, which can be a number or string. The component will automatically start the rolling animation by default.

## Preset Character Sets

Select a preset character set via the `preset` property:

- `'number'`: Digits 0-9 (default)
- `'letter'`: Upper and lowercase letters A-Za-z
- `'letterUpper'`: Uppercase letters A-Z
- `'letterLower'`: Lowercase letters a-z
- `'alphanumeric'`: Alphanumeric characters
- `'hex'`: Hexadecimal 0-9a-f
- `'hexUpper'`: Hexadecimal uppercase 0-9A-F
- `'binary'`: Binary 01
- `'octal'`: Octal 0-7

## Custom Character Set

Fully customize the character set via the `charSet` property, which takes priority over `preset`. Suitable for emoji, Chinese characters, and other special scenarios.

Note: For combining characters (such as 7⃣ composed of multiple Unicode code points), it is recommended to use single code point characters to avoid character splitting issues.

## Money Format

Enable thousand separator with the `separator` property, and set decimal places with the `decimal` property. Combine with `prefix` and `suffix` properties to add currency symbols and units.

## Scroll Direction

Set the scroll direction via the `direction` property:

- `'up'`: Scroll up (default)
- `'down'`: Scroll down

## Loops

Set the number of animation loops via the `loops` property. Increasing loops makes the animation more spectacular, suitable for lottery and slot machine scenarios.

## Stagger Animation

Set the animation delay for each character via the `stagger` property (in milliseconds), creating a wave-like animation effect. Set to `0` for all characters to scroll simultaneously.

## Manual Control

Set `autoStart` to `false` to disable auto-start. Get the component instance via `bind:this` to call these methods:

- `start()`: Start animation
- `pause()`: Pause animation (auto snap to complete character position)
- `reset()`: Reset animation

## Loop Animation

Set `loop` to `true` to enable loop playback, and set the loop interval via `loopInterval`.

## Easing Function

The easing type for the rolling animation is determined by the `easing` property, with a default value of `cubicOut`. There are 31 optional values (including a linear animation and 30 non-linear animations), specifically documented at [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing), and the specific non-linear effects can be seen at the [ease visualizer](https://svelte.dev/examples/easing). The animation duration is determined by the `duration` property.

| ease    | in        | out        | inOut        |
| ------- | --------- | ---------- | ------------ |
| back    | backIn    | backOut    | backInOut    |
| bounce  | bounceIn  | bounceOut  | bounceInOut  |
| circ    | circIn    | circOut    | circInOut    |
| cubic   | cubicIn   | cubicOut   | cubicInOut   |
| elastic | elasticIn | elasticOut | elasticInOut |
| expo    | expoIn    | expoOut    | expoInOut    |
| quad    | quadIn    | quadOut    | quadInOut    |
| quart   | quartIn   | quartOut   | quartInOut   |
| quint   | quintIn   | quintOut   | quintInOut   |
| sine    | sineIn    | sineOut    | sineInOut    |

Among them, `backOut` produces a bounce-back effect, `elasticOut` produces an elastic effect, and `bounceOut` produces a bouncing effect, suitable for slot machines, lotteries, and other scenarios requiring visual impact.

## Custom Style

The component provides rich style configurations:

- `height`: Character height (pixels)
- `fontSize`: Font size
- `fontWeight`: Font weight
- `bg`: Background color
- `radius`: Border radius
- `gap`: Character gap

## Events

- `onstart`: Triggered when animation starts
- `oncomplete`: Triggered when animation completes
- `onchange`: Triggered when value changes

## CSS Injection

Inject CSS class names to the component container via `injClass`, and to each character container via `charClass`.

## Custom Rendering

Fully customize each character's rendering content via the `children` Snippet. The Snippet receives two parameters:

- `char`: Current character
- `index`: Character index
