interface CommonGlassProps {
  /** A unique identifier for the component (used for accessibility or testing). */
  id?: string;
  /** Avoids creating SVG filter layers (improves performance in heavy UIs). */
  avoidSvgCreation?: boolean;
  /** Optional React key for list rendering. */
  key?: any;
  /** Name attribute for inputs, useful in forms. */
  name?: string;
  /** Width of the component in pixels. */
  width?: number;
  /** Height of the component in pixels. */
  height?: number;
  /** Additional class names applied to the root element. */
  className?: string;
  /** Additional class names for the internal content container. */
  contentClassName?: string;
  /** If true, centers content horizontally using flex layout. */
  contentCenter?: boolean;
  /** If true, centers content vertically using flex layout. */
  itemsCenter?: boolean;
  /** Background blur intensity in pixels (e.g. 2 = blur(2px)). */
  blur?: number;
  /** Strength of distortion effect via displacement map (0–100). */
  distortion?: number;
  /** Chromatic aberration intensity (color fringing effect). */
  chromaticAberration?: number;
  /** Border radius of the component (in pixels). */
  borderRadius?: number;
  /** Opacity of the border (0 to 1). */
  borderOpacity?: number;
  /** Border thickness in pixels. */
  borderSize?: number;
  /** Border color of the component. */
  borderColor?: string;
  /** Text color inside the component. */
  color?: string;
  /** Background color of the glass layer. */
  backgroundColor?: string;
  /** Opacity of the background color overlay (0 to 1). */
  backgroundOpacity?: number;
  /**
   * Controls how elastic or responsive the glass effect feels.
   * Required for hover scale and distortion responsiveness.
   */
  flexibility?: number;
  /** Multiplier for scaling when hovered (requires flexibility > 0). */
  onHoverScale?: number;
  /** Saturation level applied to content (e.g., 100 = normal, 120 = more vivid). */
  saturation?: number;
  /** Brightness multiplier for the component (e.g., 100 = normal, 80 = dimmer). */
  brightness?: number;
  /** Blur radius for the inner light/glow effect. */
  innerLightBlur?: number;
  /** Spread distance (in px) for the inner light effect. */
  innerLightSpread?: number;
  /** Color of the inner glow/light. */
  innerLightColor?: string;
  /** Opacity of the inner glow (0 to 1). */
  innerLightOpacity?: number;
  /** Blur radius for the outer light/glow effect. */
  outerLightBlur?: number;
  /** Spread distance (in px) for the outer glow effect. */
  outerLightSpread?: number;
  /** Color of the outer glow/light. */
  outerLightColor?: string;
  /** Opacity of the outer glow (0 to 1). */
  outerLightOpacity?: number;
  /** Padding inside the component (uses CSS shorthand, e.g. "10px 20px"). */
  padding?: string;
  /** Z-index value to control stacking order. */
  zIndex?: number;
  /** Optional click handler for the component. */
  onClick?: () => void;
}

export type GlassInputProps = CommonGlassProps & {
  value?: any;
  /** Input type, e.g., text, number, file, range, etc. */
  type?: string;
  /** Maximum number of characters allowed. */
  maxLength?: number;
  /** Minimum number of characters required. */
  minLength?: number;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Optional label displayed with the input. */
  label?: string;
  /** Text color for label. */
  labelColor?: string;
  /** Allows multiple file selections (if type is file). */
  multiple?: boolean;
  /** Marks the field as required. */
  required?: boolean;
  /** Automatically focuses the input when rendered. */
  autofocus?: boolean;
  /** Optional change event handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Minimum value for range/number inputs. */
  min?: number;
  /** Maximum value for range/number inputs. */
  max?: number;
  /** Step increment for range/number inputs. */
  step?: number;
};

export type GlassCardProps = CommonGlassProps & {
  /** Content inside the card (can be text, elements, etc.). */
  children?: React.ReactNode;
};

export interface GlassStyleModel {
  transform: string;
  innerBoxShadow: string;
  outerBoxShadow: string;
}

export type GlassButtonProps = CommonGlassProps & {
  /** Button content, usually text or icons. */
  children?: React.ReactNode;
};

export const glassDefaultProps: Partial<CommonGlassProps> = {
  blur: 2,
  distortion: 20,
  chromaticAberration: 0,
  borderRadius: 10,
  borderSize: 1,
  borderOpacity: 1,
  color: "white",
  backgroundColor: "white",
  backgroundOpacity: 0,
  flexibility: 0,
  onHoverScale: 1,
  saturation: 120,
  brightness: 100,
  innerLightBlur: 10,
  innerLightSpread: 1,
  innerLightColor: "white",
  innerLightOpacity: 0,
  outerLightBlur: 10,
  outerLightSpread: 1,
  outerLightColor: "white",
  outerLightOpacity: 0,
  padding: "10px",
};
