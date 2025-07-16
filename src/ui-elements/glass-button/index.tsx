import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  glassDefaultProps,
  type GlassButtonProps,
  type GlassStyleModel,
} from "../../models";
import { calculateHoverEffect, renderLayers } from "../../utils";
import "./glass-button.css";

export const GlassButton: React.FunctionComponent<GlassButtonProps> = (
  props
) => {
  const {
    contentCenter = true,
    itemsCenter = true,
    children,
    ...buttonProps
  } = { ...glassDefaultProps, ...props };
  const id = useMemo(() => buttonProps.id ?? crypto.randomUUID(), []);
  const glassButtonContainerRef = useRef<HTMLDivElement>(null);
  const glassButtonContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<GlassStyleModel>({
    transform: "none",
    innerBoxShadow: `inset 0 0 ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
    outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
  });

  useEffect(() => {
    const input = glassButtonContainerRef.current;
    if (!input) return;
    const handleMouseMove = (e: MouseEvent) => {
      const result = calculateHoverEffect(e, input, buttonProps);
      setStyle((prev) => ({
        ...prev,
        ...result,
      }));
    };
    const reset = () => {
      setIsHovered(false);
      setStyle({
        transform: "none",
        innerBoxShadow: `inset 0 0 ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
        outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
      });
    };
    input.addEventListener("mousemove", handleMouseMove);
    input.addEventListener("mouseleave", reset);
    return () => {
      input.removeEventListener("mousemove", handleMouseMove);
      input.removeEventListener("mouseleave", reset);
    };
  }, [style]);

  useEffect(() => {
    setStyle((prev) => ({
      ...prev,
      innerBoxShadow: `inset 0 0 ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
      outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
    }));
  }, [
    buttonProps.innerLightBlur,
    buttonProps.innerLightSpread,
    buttonProps.innerLightColor,
    buttonProps.outerLightBlur,
    buttonProps.outerLightSpread,
    buttonProps.outerLightColor,
  ]);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        id={buttonProps.id}
        key={buttonProps.key}
        ref={glassButtonContainerRef}
        className={`glass-ui-container ${
          buttonProps.className ? buttonProps.className : ""
        }`}
        onClick={buttonProps.onClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{
          color: buttonProps.color,
          width: buttonProps.width ?? "100%",
          height: buttonProps.height,
          borderRadius: buttonProps.borderRadius,
          transform: style.transform,
          transition: isHovered
            ? "transform 80ms ease-out"
            : "transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)",
          willChange: "transform",
          zIndex: buttonProps.zIndex,
        }}
      >
        {renderLayers(
          id,
          buttonProps.blur ?? 1,
          buttonProps.borderRadius ?? 8,
          buttonProps.saturation ?? 100,
          buttonProps.brightness ?? 100,
          buttonProps.distortion ?? 50,
          buttonProps.backgroundColor ?? "white",
          buttonProps.backgroundOpacity ?? 0,
          style,
          buttonProps.innerLightOpacity ?? 0.2,
          buttonProps.outerLightOpacity ?? 0.2,
          buttonProps.borderColor ?? buttonProps.innerLightColor ?? "white",
          buttonProps.borderSize ?? 1,
          buttonProps.borderOpacity ?? 1,
          buttonProps.chromaticAberration ?? 0,
          buttonProps.avoidSvgCreation ?? false
        )}
        <div
          ref={glassButtonContentRef}
          className={`glass-ui-button-content ${
            contentCenter ? "content-center" : ""
          } ${itemsCenter ? "items-center" : ""} ${
            contentCenter || itemsCenter ? "d-flex" : ""
          } ${
            buttonProps.contentClassName ? buttonProps.contentClassName : ""
          }`}
          style={{
            padding: buttonProps.padding,
            borderRadius: buttonProps.borderSize,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
