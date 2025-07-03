## React Glass UI

A customizable React component library for creating elegant **glassmorphism** interfaces. It provides flexible, interactive UI elements, such as cards, buttons, and inputs, with effects including blur, saturation, distortion, light glow, and hover.

## Features

* GlassCard with distortion, glow, and hover flexibility
* GlassButton with customizable light and motion effects
* GlassInput with built-in label and glass styling
* TypeScript support
* Easily integrates into any layout or theme

## Installation

```bash
npm install react-glass-ui
```

## Usage

### `<GlassCard />`

```tsx
import { GlassCard } from "react-glass-ui";

<GlassCard>Hello World</GlassCard>
```

### `<GlassButton />`

```tsx
import { GlassButton } from "react-glass-ui";

<GlassButton>Click Me</GlassButton>
```

### `<GlassInput />`

```tsx
import { GlassInput } from "react-glass-ui";

<GlassInput label="Email:" placeholder="you@example.com" />
```

## Shared Props (`CommonGlassProps`)

These props are accepted by all components:

| Prop                | Type       | Description                                        |
| ------------------- | ---------- | -------------------------------------------------- |
| `id`                | `string`   | Unique identifier.                                 |
| `key`               | `string`   | Optional React key.                                |
| `name`              | `string`   | Input or component name.                           |
| `width`             | `number`   | Width in pixels.                                   |
| `height`            | `number`   | Height in pixels.                                  |
| `className`         | `string`   | Additional class names.                            |
| `contentCenter`     | `boolean`  | Centers child content.                             |
| `blur`              | `number`   | Background blur level.                             |
| `distortion`        | `number`   | Distortion intensity.                              |
| `borderColor`       | `string`   | Border color.                                      |
| `borderRadius`      | `number`   | Corner radius.                                     |
| `borderSize`        | `number`   | Border thickness in pixels.                        |
| `color`             | `string`   | Text color.                                        |
| `backgroundColor`   | `string`   | Background color.                                  |
| `backgroundOpacity` | `number`   | Background opacity (0 to 1).                       |
| `flexibility`       | `number`   | Enables responsiveness to interaction/motion.      |
| `onHoverScale`      | `number`   | Scale-up on hover (requires `flexibility > 0`).    |
| `saturation`        | `number`   | Saturation of content.                             |
| `innerLightBlur`    | `number`   | Inner glow blur radius.                            |
| `innerLightSpread`  | `number`   | Inner glow spread distance.                        |
| `innerLightColor`   | `string`   | Inner glow color.                                  |
| `innerLightOpacity` | `number`   | Inner glow opacity (0 to 1).                       |
| `outerLightBlur`    | `number`   | Outer glow blur radius.                            |
| `outerLightSpread`  | `number`   | Outer glow spread distance.                        |
| `outerLightColor`   | `string`   | Outer glow color.                                  |
| `outerLightOpacity` | `number`   | Outer glow opacity (0 to 1).                       |
| `padding`           | `string`   | Padding using CSS shorthand (e.g., `"10px 20px"`). |
| `zIndex`            | `number`   | Component layering order.                          |
| `onClick`           | `function` | Optional click handler.                            |

## Component-Specific Props

### `<GlassCard />`

| Prop       | Type        | Description              |
| ---------- | ----------- | ------------------------ |
| `children` | `ReactNode` | Content inside the card. |

> Inherits all **CommonGlassProps**

### `<GlassButton />`

| Prop       | Type        | Description                  |
| ---------- | ----------- | ---------------------------- |
| `children` | `ReactNode` | Button content (text/icons). |

> Inherits all **CommonGlassProps**

### `<GlassInput />`

| Prop          | Type                                       | Description                                |
| ------------- | ------------------------------------------ | ------------------------------------------ |
| `type`        | `string`                                   | Input type (`text`, `email`, `file`, etc.) |
| `placeholder` | `string`                                   | Placeholder text.                          |
| `label`       | `string`                                   | Label displayed above the input.           |
| `labelColor`  | `string`                                   | Color of the label text.                   |
| `maxLength`   | `number`                                   | Maximum number of characters.              |
| `minLength`   | `number`                                   | Minimum number of characters.              |
| `multiple`    | `boolean`                                  | Allow multiple files (for `file` input).   |
| `required`    | `boolean`                                  | Marks the field as required.               |
| `autofocus`   | `boolean`                                  | Autofocus on mount.                        |
| `onChange`    | `(e: React.ChangeEvent<HTMLInputElement>)` | Input change event handler.                |

> Inherits all **CommonGlassProps**

## Development

```bash
npm install
npm run build
```

## License (MIT)

Copyright (c) 2025 Yash Kamnani

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
