import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  glassDefaultProps,
  type GlassCardProps,
  type GlassStyleModel,
} from "../../models";
import { calculateHoverEffect, renderLayers } from "../../utils";
import "./glass-card.css";

export const GlassCard: React.FunctionComponent<GlassCardProps> = (
  props: GlassCardProps
) => {
  const {
    padding = "10px 20px",
    children,
    ...cardProps
  } = { ...glassDefaultProps, ...props };
  const id = useMemo(() => cardProps.id ?? crypto.randomUUID(), []);
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
    if (!card) return;
    const handleMouseMove = (e: MouseEvent) => {
      const result = calculateHoverEffect(e, card, cardProps);
      setStyle((prev) => ({
        ...prev,
        ...result,
      }));
    };
    const reset = () => {
      setIsHovered(false);
      setStyle({
        transform: "none",
        innerBoxShadow: `inset 0 0 ${cardProps.innerLightBlur}px ${cardProps.innerLightSpread}px ${cardProps.innerLightColor}`,
        outerBoxShadow: `0 0 ${cardProps.outerLightBlur}px ${cardProps.outerLightSpread}px ${cardProps.outerLightColor}`,
      });
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, [style]);

  useEffect(() => {
    setStyle((prev) => ({
      ...prev,
      innerBoxShadow: `inset 0 0 ${cardProps.innerLightBlur}px ${cardProps.innerLightSpread}px ${cardProps.innerLightColor}`,
      outerBoxShadow: `0 0 ${cardProps.outerLightBlur}px ${cardProps.outerLightSpread}px ${cardProps.outerLightColor}`,
    }));
  }, [
    cardProps.innerLightBlur,
    cardProps.innerLightSpread,
    cardProps.innerLightColor,
    cardProps.outerLightBlur,
    cardProps.outerLightSpread,
    cardProps.outerLightColor,
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
        id={cardProps.id}
        key={cardProps.key}
        ref={glassCardContainerRef}
        className={`glass-ui-container ${
          cardProps.className ? cardProps.className : ""
        }`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={cardProps.onClick}
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
          id,
          cardProps.blur ?? 1,
          cardProps.borderRadius ?? 8,
          cardProps.saturation ?? 100,
          cardProps.brightness ?? 100,
          cardProps.distortion ?? 50,
          cardProps.backgroundColor ?? "white",
          cardProps.backgroundOpacity ?? 0,
          style,
          cardProps.innerLightOpacity ?? 0.2,
          cardProps.outerLightOpacity ?? 0.2,
          cardProps.borderColor ?? cardProps.innerLightColor ?? "white",
          cardProps.borderSize ?? 1,
          cardProps.borderOpacity ?? 1,
          cardProps.chromaticAberration ?? 0,
          cardProps.avoidSvgCreation ?? false
        )}
        <div
          ref={glassCardContentRef}
          className={`glass-ui-card-content ${
            cardProps.contentCenter ? "content-center" : ""
          } ${cardProps.itemsCenter ? "items-center" : ""} ${
            cardProps.contentCenter || cardProps.itemsCenter ? "d-flex" : ""
          } ${cardProps.contentClassName ? cardProps.contentClassName : ""}`}
          style={{
            padding: padding ?? "",
            borderRadius: cardProps.borderRadius,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
