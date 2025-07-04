import React, { useEffect, useRef, useState } from "react";
import {
  glassDefaultProps,
  type GlassInputProps,
  type GlassStyleModel,
} from "../../models";
import { renderLayers } from "../../utils";
import "./glass-input.css";

export const GlassInput: React.FunctionComponent<GlassInputProps> = (
  props: GlassInputProps
) => {
  const {
    height = 40,
    type = "text",
    maxLength,
    minLength,
    placeholder = "Placeholder",
    label,
    labelColor = "white",
    multiple = false,
    required = false,
    autofocus = false,
    onChange,
    ...inputProps
  } = { ...glassDefaultProps, ...props };
  const glassInputContainerRef = useRef<HTMLDivElement>(null);
  const glassInputContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<GlassStyleModel>({
    transform: "none",
    innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
    outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
  });

  useEffect(() => {
    const card = glassInputContainerRef.current;
    if (!card || (inputProps.flexibility && inputProps.flexibility <= 0))
      return;
    const handleMouseMove = (e: MouseEvent) => {
      if (inputProps.flexibility && inputProps.flexibility > 0) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = inputProps.flexibility / 100;
        const translateX = Math.cos(angle) * distance * scaleFactor;
        const translateY = Math.sin(angle) * distance * scaleFactor;
        let stretchX = 0;
        let stretchY = 0;
        if (inputProps.onHoverScale) {
          stretchX =
            inputProps.onHoverScale + Math.abs(translateX) / rect.width;
          stretchY =
            inputProps.onHoverScale + Math.abs(translateY) / rect.height;
        }
        const shadowX = -translateX * 0.02;
        const shadowY = -translateY * 0.02;
        setStyle({
          transform: `translate(${translateX}px, ${translateY}px) scale(${stretchX}, ${stretchY})`,
          innerBoxShadow: `inset ${shadowX}px ${shadowY}px ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
          outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
        });
      }
    };
    const reset = () => {
      if (inputProps.flexibility && inputProps.flexibility > 0) {
        setIsHovered(false);
        setStyle({
          transform: "none",
          innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
          outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
        });
      }
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, [inputProps.flexibility, inputProps.onHoverScale, style]);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      id={inputProps.id}
      key={inputProps.key}
      className={`glass-ui-input-container ${inputProps.className}`}
    >
      <label className="glass-ui-input-label" style={{ color: labelColor }}>
        {label}
      </label>
      <div
        ref={glassInputContainerRef}
        className="glass-ui-container"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{
          color: inputProps.color,
          width: inputProps.width,
          height,
          borderRadius: inputProps.borderRadius,
          transform: style.transform,
          transition: isHovered
            ? "transform 80ms ease-out"
            : "transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)",
          willChange: "transform",
          zIndex: inputProps.zIndex,
        }}
      >
        {renderLayers(
          inputProps.blur ? inputProps.blur : 1,
          inputProps.borderRadius ? inputProps.borderRadius : 8,
          inputProps.saturation ? inputProps.saturation : 100,
          inputProps.distortion ? inputProps.distortion : 50,
          inputProps.backgroundColor ? inputProps.backgroundColor : "white",
          inputProps.backgroundOpacity ? inputProps.backgroundOpacity : 0,
          style,
          inputProps.innerLightOpacity ? inputProps.innerLightOpacity : 0.2,
          inputProps.outerLightOpacity ? inputProps.outerLightOpacity : 0.2,
          inputProps.borderColor
            ? inputProps.borderColor
            : inputProps.innerLightColor
            ? inputProps.innerLightColor
            : "white",
          inputProps.borderSize ? inputProps.borderSize : 1
        )}
        <div
          ref={glassInputContentRef}
          className="glass-ui-input-content"
          style={{
            borderRadius: inputProps.borderRadius,
          }}
        >
          <input
            type={type}
            name={inputProps.name}
            placeholder={placeholder}
            required={required}
            autoFocus={autofocus}
            multiple={multiple}
            maxLength={maxLength}
            minLength={minLength}
            className={`glass-input ${
              inputProps.contentCenter ? "content-center" : ""
            }`}
            onChange={(e) => (onChange ? onChange(e) : {})}
            style={{
              color: inputProps.color,
              padding: inputProps.padding,
            }}
          />
          {type === "file" ? (
            <span
              style={{
                color: inputProps.color,
              }}
              className={`file-type-placeholder ${
                inputProps.contentCenter ? "content-center" : ""
              }`}
            >
              {placeholder}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
