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
  const id = useMemo(
    () => buttonProps.id ?? crypto.randomUUID(),
    [buttonProps.id]
  );
  const glassButtonContainerRef = useRef<HTMLDivElement>(null);
  const glassButtonContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<GlassStyleModel>({
    transform: "none",
    innerBoxShadow: `inset 0 0 ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
    outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
  });

  useEffect(() => {
    const card = glassButtonContainerRef.current;
    if (!card) return;
    const getTouchPoint = (e: TouchEvent | MouseEvent) => {
      if ("touches" in e && e.touches.length > 0) {
        return {
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        };
      }
      return {
        clientX: (e as MouseEvent).clientX,
        clientY: (e as MouseEvent).clientY,
      };
    };
    const handleMove = (e: any) => {
      const point = getTouchPoint(e);
      const result = calculateHoverEffect(point as any, card, buttonProps);
      setStyle((prev) => ({
        ...prev,
        ...result,
      }));
      setIsHovered(true);
    };
    const reset = () => {
      setIsHovered(false);
      setStyle({
        transform: "none",
        innerBoxShadow: `inset 0 0 ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
        outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
      });
    };
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);
    card.addEventListener("touchstart", handleMove, { passive: true });
    card.addEventListener("touchmove", handleMove, { passive: true });
    card.addEventListener("touchend", reset);
    card.addEventListener("touchcancel", reset);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
      card.removeEventListener("touchstart", handleMove);
      card.removeEventListener("touchmove", handleMove);
      card.removeEventListener("touchend", reset);
      card.removeEventListener("touchcancel", reset);
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
