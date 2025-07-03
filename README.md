## React Glass UI

A customizable React component library for creating elegant **glassmorphism** interfaces. It provides flexible, interactive UI elements, such as cards, buttons, and inputs, with effects including blur, saturation, distortion, light glow, and hover.

## Features

- GlassCard with distortion, light, and hover flexibility
- GlassButton with glow and hover interactions
- GlassInput with minimal style, distortion, and adaptive blur
- TypeScript support
- Designed to integrate with any layout or theme

## Installation

```bash
npm install react-glass-ui
````

## Usage

### Default `<GlassCard />`
```tsx
import { GlassCard } from "react-glass-ui";

<GlassCard id="main-card">Hello World</GlassCard>
```

### Default `<GlassButton />`
```tsx
import { GlassButton } from "react-glass-ui";

<GlassButton id="main-button">Hello World</GlassButton>
```

### Default `<GlassInput />`
```tsx
import { GlassInput } from "react-glass-ui";

<GlassInput id="main-input" label="Email:" />
```

## Components & Props

### `<GlassCard />`

| Prop                | Type        | Description                                                          |
| ------------------- | ----------- | -------------------------------------------------------------------- |
| `id`                | `string`    | **Required.** Unique identifier used for filters and internal logic. |
| `width`             | `number`    | Width of the card in pixels.                                         |
| `height`            | `number`    | Height of the card in pixels.                                        |
| `className`         | `string`    | Custom class names for styling.                                      |
| `children`          | `ReactNode` | Content inside the card.                                             |
| `contentCenter`     | `boolean`   | Center the children vertically and horizontally.                     |
| `blur`              | `number`    | Amount of background blur.                                           |
| `borderRadius`      | `number`    | Radius of the card’s corners.                                        |
| `distortion`        | `number`    | Strength of the distortion effect.                                   |
| `backgroundColor`   | `string`    | Background color (e.g., `"#ffffff"`).                                |
| `backgroundOpacity` | `number`    | Opacity of background color (0–1).                                   |
| `flexibility`       | `number`    | Controls interaction responsiveness and enables hover effects.       |
| `saturation`        | `number`    | Color saturation level.                                              |
| `onHoverScale`      | `number`    | Scale transform on hover (requires `flexibility > 0`).               |
| `innerLight*`       | `various`   | Blur, spread, color, and opacity for inner glow.                     |
| `outerLight*`       | `various`   | Blur, spread, color, and opacity for outer glow.                     |
| `borderColor`       | `string`    | Border color.                                                        |
| `borderSize`        | `number`    | Border width in pixels.                                              |
| `padding`           | `string`    | Padding (CSS shorthand).                                             |
| `zIndex`            | `number`    | Z-index for layering.                                                |
| `onClick`           | `function`  | Click handler.                                                       |

### `<GlassButton />`

| Prop                | Type        | Description                                              |
| ------------------- | ----------- | -------------------------------------------------------- |
| `id`                | `string`    | **Required.** Unique ID for button behavior and effects. |
| `name`              | `string`    | Optional name attribute.                                 |
| `children`          | `ReactNode` | Button content (text or icons).                          |
| `width`             | `number`    | Width in pixels.                                         |
| `height`            | `number`    | Height in pixels.                                        |
| `className`         | `string`    | Custom classes for styling.                              |
| `blur`              | `number`    | Background blur.                                         |
| `borderRadius`      | `number`    | Corner roundness.                                        |
| `distortion`        | `number`    | Displacement level.                                      |
| `backgroundColor`   | `string`    | Background color.                                        |
| `backgroundOpacity` | `number`    | Opacity of background (0–1).                             |
| `flexibility`       | `number`    | Enables interactive hover/press effects.                 |
| `saturation`        | `number`    | Color saturation.                                        |
| `innerLight*`       | `various`   | Inner light blur, color, spread, opacity.                |
| `outerLight*`       | `various`   | Outer glow styling.                                      |
| `borderColor`       | `string`    | Button border color.                                     |
| `borderSize`        | `number`    | Button border size.                                      |
| `onHoverScale`      | `number`    | Scale on hover (if `flexibility > 0`).                   |
| `zIndex`            | `number`    | Layer position.                                          |
| `onClick`           | `function`  | Button click handler.                                    |

### `<GlassInput />`

| Prop                | Type       | Description                            |
| ------------------- | ---------- | -------------------------------------- |
| `id`                | `string`   | **Required.** Unique ID for the input. |
| `name`              | `string`   | Input name attribute.                  |
| `type`              | `string`   | Input type (`text`, `file`, etc.).     |
| `maxLength`         | `number`   | Max characters allowed.                |
| `minLength`         | `number`   | Minimum required characters.           |
| `placeholder`       | `string`   | Input placeholder text.                |
| `label`             | `string`   | Optional visible label.                |
| `multiple`          | `boolean`  | For file inputs: allow multiple files. |
| `required`          | `boolean`  | Makes input required.                  |
| `autofocus`         | `boolean`  | Autofocus on render.                   |
| `width`             | `number`   | Width in pixels.                       |
| `height`            | `number`   | Height in pixels.                      |
| `className`         | `string`   | Custom CSS classes.                    |
| `blur`              | `number`   | Blur level.                            |
| `borderRadius`      | `number`   | Corner roundness.                      |
| `distortion`        | `number`   | Distortion strength.                   |
| `backgroundColor`   | `string`   | Input background color.                |
| `backgroundOpacity` | `number`   | Input background opacity (0–1).        |
| `flexibility`       | `number`   | For hover or input motion effects.     |
| `saturation`        | `number`   | Saturation of input content.           |
| `innerLight*`       | `various`  | Input glow styling.                    |
| `outerLight*`       | `various`  | External light effects.                |
| `borderColor`       | `string`   | Input border color.                    |
| `borderSize`        | `number`   | Border thickness.                      |
| `paddingX`          | `number`   | Horizontal padding.                    |
| `onHoverScale`      | `number`   | Hover scale amount.                    |
| `zIndex`            | `number`   | Layer stacking.                        |
| `onChange`          | `function` | Input change event.                    |

## Development

```bash
npm install
npm run build
```

## License

MIT — see [LICENSE](./LICENSE)
