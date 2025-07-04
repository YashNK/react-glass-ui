import React, { useEffect, useRef, useState } from "react";
import {
  glassDefaultProps,
  type GlassButtonProps,
  type GlassStyleModel,
} from "../../models";
import { renderLayers } from "../../utils";
import "./glass-button.css";

export const GlassButton: React.FunctionComponent<GlassButtonProps> = (
  props
) => {
  const {
    height = 30,
    children,
    ...buttonProps
  } = { ...glassDefaultProps, ...props };
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
    if (!card || (buttonProps.flexibility && buttonProps.flexibility <= 0))
      return;
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonProps.flexibility && buttonProps.flexibility > 0) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = buttonProps.flexibility / 100;
        const translateX = Math.cos(angle) * distance * scaleFactor;
        const translateY = Math.sin(angle) * distance * scaleFactor;
        let stretchX = 0;
        let stretchY = 0;
        if (buttonProps.onHoverScale) {
          stretchX =
            buttonProps.onHoverScale + Math.abs(translateX) / rect.width;
          stretchY =
            buttonProps.onHoverScale + Math.abs(translateY) / rect.height;
        }
        const shadowX = -translateX * 0.02;
        const shadowY = -translateY * 0.02;
        setStyle({
          transform: `translate(${translateX}px, ${translateY}px) scale(${stretchX}, ${stretchY})`,
          innerBoxShadow: `inset ${shadowX}px ${shadowY}px ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
          outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
        });
      }
    };
    const reset = () => {
      if (buttonProps.flexibility && buttonProps.flexibility > 0) {
        setIsHovered(false);
        setStyle({
          transform: "none",
          innerBoxShadow: `inset 0 0 ${buttonProps.innerLightBlur}px ${buttonProps.innerLightSpread}px ${buttonProps.innerLightColor}`,
          outerBoxShadow: `0 0 ${buttonProps.outerLightBlur}px ${buttonProps.outerLightSpread}px ${buttonProps.outerLightColor}`,
        });
      }
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, [buttonProps.flexibility, buttonProps.onHoverScale, style]);

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
        className={`glass-ui-container ${buttonProps.className}`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{
          color: buttonProps.color,
          width: buttonProps.width,
          height,
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
          buttonProps.blur ? buttonProps.blur : 1,
          buttonProps.borderRadius ? buttonProps.borderRadius : 8,
          buttonProps.saturation ? buttonProps.saturation : 100,
          buttonProps.distortion ? buttonProps.distortion : 50,
          buttonProps.backgroundColor ? buttonProps.backgroundColor : "white",
          buttonProps.backgroundOpacity ? buttonProps.backgroundOpacity : 0,
          style,
          buttonProps.innerLightOpacity ? buttonProps.innerLightOpacity : 0.2,
          buttonProps.outerLightOpacity ? buttonProps.outerLightOpacity : 0.2,
          buttonProps.borderColor
            ? buttonProps.borderColor
            : buttonProps.innerLightColor
            ? buttonProps.innerLightColor
            : "white",
          buttonProps.borderSize ? buttonProps.borderSize : 1
        )}
        <div
          ref={glassButtonContentRef}
          className="glass-ui-button-content"
          style={{
            padding: buttonProps.padding,
            borderRadius: buttonProps.borderSize,
          }}
          onClick={buttonProps.onClick}
        >
          <button
            style={{
              color: buttonProps.color,
            }}
            className={`glass-button ${
              buttonProps.contentCenter ? "content-center" : ""
            }`}
          >
            {children}
          </button>
        </div>
      </div>
    </>
  );
};
