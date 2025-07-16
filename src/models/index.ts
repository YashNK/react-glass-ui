interface CommonGlassProps {
  /** A unique identifier. */
  id?: string;
  avoidSvgCreation?: boolean;
  /** Optional React key. */
  key?: any;
  /** Input name attribute. */
  name?: string;
  /** Width of the component in pixels. */
  width?: number;
  /** Height of the component in pixels. */
  height?: number;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** Additional CSS class names for custom styling for contents. */
  contentClassName?: string;
  /** Centers content horizontally inside the component when true. */
  contentCenter?: boolean;
  /** Centers content vertically inside the component when true. */
  itemsCenter?: boolean;
  /** Amount of blur applied to the component background. */
  blur?: number;
  /** Strength of the distortion/displacement effect. */
  distortion?: number;
  chromaticAberration?: number;
  /** Border radius of the component in pixels. */
  borderColor?: string;
  /** Thickness of the border in pixels. */
  borderRadius?: number;
  borderOpacity?: number;
  /** Border color of the component. */
  borderSize?: number;
  color?: string;
  /** Background color of the component. */
  backgroundColor?: string;
  /** Opacity of the background color (0 to 1). */
  backgroundOpacity?: number;
  /** Controls elastic movement; required for hover and distortion effects. */
  flexibility?: number;
  /** Enables a scaling effect when the component is hovered. Requires `flexibility` to be greater than 0. */
  onHoverScale?: number;
  /** Saturation level of the content inside the component. */
  saturation?: number;
  brightness?: number;
  /** Blur radius of the inner light/glow. */
  innerLightBlur?: number;
  /** Spread distance of the inner light effect. */
  innerLightSpread?: number;
  /** Color of the inner light/glow. */
  innerLightColor?: string;
  /** Opacity of the inner light (0 to 1). */
  innerLightOpacity?: number;
  /** Blur radius of the outer light/glow. */
  outerLightBlur?: number;
  /** Spread distance of the outer light effect. */
  outerLightSpread?: number;
  /** Color of the outer light/glow. */
  outerLightColor?: string;
  /** Opacity of the outer light (0 to 1). */
  outerLightOpacity?: number;
  /** Padding inside the component (CSS shorthand string). */
  padding?: string;
  /** Z-index of the component, controlling stacking order. */
  zIndex?: number;
  /** Optional click event handler. */
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
