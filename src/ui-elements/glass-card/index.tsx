import React, { useEffect, useRef, useState } from "react";
import {
  glassDefaultProps,
  type GlassCardProps,
  type GlassStyleModel,
} from "../../models";
import { renderLayers } from "../../utils";
import "./glass-card.css";

export const GlassCard: React.FunctionComponent<GlassCardProps> = (
  props: GlassCardProps
) => {
  const {
    padding = "10px 20px",
    children,
    ...cardProps
  } = { ...glassDefaultProps, ...props };
  const glassCardContainerRef = useRef<HTMLDivElement>(null);
  const glassCardContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<GlassStyleModel>({
    transform: "none",
    innerBoxShadow: `inset 0 0 ${cardProps.innerLightBlur}px ${cardProps.innerLightSpread}px ${cardProps.innerLightColor}`,
    outerBoxShadow: `0 0 ${cardProps.outerLightBlur}px ${cardProps.outerLightSpread}px ${cardProps.outerLightColor}`,
  });

  useEffect(() => {
    const card = glassCardContainerRef.current;
    if (!card || (cardProps.flexibility && cardProps.flexibility <= 0)) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (cardProps.flexibility && cardProps.flexibility > 0) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = cardProps.flexibility / 100;
        const translateX = Math.cos(angle) * distance * scaleFactor;
        const translateY = Math.sin(angle) * distance * scaleFactor;
        let stretchX = 0;
        let stretchY = 0;
        if (cardProps.onHoverScale) {
          stretchX = cardProps.onHoverScale + Math.abs(translateX) / rect.width;
          stretchY =
            cardProps.onHoverScale + Math.abs(translateY) / rect.height;
        }
        const shadowX = -translateX * 0.02;
        const shadowY = -translateY * 0.02;
        setStyle({
          transform: `translate(${translateX}px, ${translateY}px) scale(${stretchX}, ${stretchY})`,
          innerBoxShadow: `inset ${shadowX}px ${shadowY}px ${cardProps.innerLightBlur}px ${cardProps.innerLightSpread}px ${cardProps.innerLightColor}`,
          outerBoxShadow: `0 0 ${cardProps.outerLightBlur}px ${cardProps.outerLightSpread}px ${cardProps.outerLightColor}`,
        });
      }
    };
    const reset = () => {
      if (cardProps.flexibility && cardProps.flexibility > 0) {
        setIsHovered(false);
        setStyle({
          transform: "none",
          innerBoxShadow: `inset 0 0 ${cardProps.innerLightBlur}px ${cardProps.innerLightSpread}px ${cardProps.innerLightColor}`,
          outerBoxShadow: `0 0 ${cardProps.outerLightBlur}px ${cardProps.outerLightSpread}px ${cardProps.outerLightColor}`,
        });
      }
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, [cardProps.flexibility, cardProps.onHoverScale, style]);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        id={cardProps.id}
        key={cardProps.key}
        ref={glassCardContainerRef}
        className={`glass-ui-container ${cardProps.className}`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{
          color: cardProps.color,
          width: cardProps.width ?? "fit-content",
          height: cardProps.height ?? "fit-content",
          borderRadius: cardProps.borderRadius,
          transform: style.transform,
          transition: isHovered
            ? "transform 80ms ease-out"
            : "transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)",
          willChange: "transform",
          zIndex: cardProps.zIndex,
        }}
      >
        {renderLayers(
          cardProps.id,
          cardProps.blur ? cardProps.blur : 1,
          cardProps.borderRadius ? cardProps.borderRadius : 8,
          cardProps.saturation ? cardProps.saturation : 100,
          cardProps.distortion ? cardProps.distortion : 50,
          cardProps.backgroundColor ? cardProps.backgroundColor : "white",
          cardProps.backgroundOpacity ? cardProps.backgroundOpacity : 0,
          style,
          cardProps.innerLightOpacity ? cardProps.innerLightOpacity : 0.2,
          cardProps.outerLightOpacity ? cardProps.outerLightOpacity : 0.2,
          cardProps.borderColor
            ? cardProps.borderColor
            : cardProps.innerLightColor
            ? cardProps.innerLightColor
            : "white",
          cardProps.borderSize ? cardProps.borderSize : 1
        )}
        <div
          ref={glassCardContentRef}
          className={`glass-ui-card-content ${
            cardProps.contentCenter ? "content-center" : ""
          }`}
          style={{
            width: cardProps.width ?? "fit-content",
            height: cardProps.height ?? "fit-content",
            padding: padding ?? "",
            borderRadius: cardProps.borderRadius,
          }}
          onClick={cardProps.onClick}
        >
          {children}
        </div>
      </div>
    </>
  );
};
