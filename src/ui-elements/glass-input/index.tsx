import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  glassDefaultProps,
  type GlassInputProps,
  type GlassStyleModel,
} from "../../models";
import { calculateHoverEffect, renderLayers } from "../../utils";
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
  const id = useMemo(() => inputProps.id ?? crypto.randomUUID(), []);
  const glassInputContainerRef = useRef<HTMLDivElement>(null);
  const glassInputContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<GlassStyleModel>({
    transform: "none",
    innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
    outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
  });

  useEffect(() => {
    const input = glassInputContainerRef.current;
    if (!input) return;
    const handleMouseMove = (e: MouseEvent) => {
      const result = calculateHoverEffect(e, input, inputProps);
      setStyle((prev) => ({
        ...prev,
        ...result,
      }));
    };
    const reset = () => {
      setIsHovered(false);
      setStyle({
        transform: "none",
        innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
        outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
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
      innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
      outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
    }));
  }, [
    inputProps.innerLightBlur,
    inputProps.innerLightSpread,
    inputProps.innerLightColor,
    inputProps.outerLightBlur,
    inputProps.outerLightSpread,
    inputProps.outerLightColor,
  ]);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  const renderInput = () => {
    if (type === "range") {
      const trackRef = useRef<HTMLDivElement>(null);
      const [dragging, setDragging] = useState(false);
      const [rangeValue, setRangeValue] = useState(inputProps.value ?? 50);
      const min = inputProps.min ?? 0;
      const max = inputProps.max ?? 100;
      const step = inputProps.step ?? 1;
      const percent = Math.ceil(((rangeValue - min) / (max - min)) * 100);

      useEffect(() => {
        if (dragging) {
          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("mouseup", handleMouseUp);
        } else {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }, [dragging]);

      const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        updatePosition(e.clientX);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (dragging) updatePosition(e.clientX);
      };

      const handleMouseUp = () => setDragging(false);

      const updatePosition = (clientX: number) => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        const percent = x / rect.width;

        const clampedValue = min + percent * (max - min);
        const steppedValue = Math.round(clampedValue / step) * step;
        const newValue = Math.min(Math.max(steppedValue, min), max);

        setRangeValue(newValue);
        onChange?.({
          target: { value: newValue, name: inputProps.name },
        } as any);
      };

      return (
        <div
          className="glass-range-track"
          ref={trackRef}
          onMouseDown={handleMouseDown}
        >
          <div
            className="glass-range-fill"
            style={{
              width: `${percent}%`,
              backgroundColor: inputProps.backgroundColor
                ? inputProps.backgroundColor
                : inputProps.borderColor
                ? inputProps.borderColor
                : "white",
              opacity: dragging ? 0.7 : 1,
            }}
          />
          <div
            className="glass-range-after-fill"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `calc(${percent > 96 ? 96 : percent}% + 30px)`,
              width: `calc(${100 - percent}% - 30px)`,
              backgroundColor: "rgba(255, 255, 255, 0.202)",
              pointerEvents: "none",
            }}
          />
          <div
            className="glass-range-thumb"
            style={{
              left: `calc(${percent > 96 ? 96 : percent}% + 17px)`,
              transform: `translate(-50%, -50%) scale(${dragging ? 1.4 : 1})`,
              borderRadius: dragging
                ? inputProps.borderRadius
                  ? inputProps.borderRadius + 1
                  : 2
                : inputProps.borderRadius,
              filter: `url(#${id}-filter)`,
              backdropFilter: `blur(${inputProps.blur}px) saturate(${inputProps.saturation}%)`,
              WebkitBackdropFilter: `blur(${inputProps.blur}px) saturate(${inputProps.saturation}%)`,
            }}
            onMouseDown={handleMouseDown}
          />
          <div
            className="glass-range-thumb glass-range-border"
            style={{
              left: `calc(${percent > 96 ? 96 : percent}% + 17px)`,
              border: `${inputProps.borderSize ?? 1}px solid ${
                inputProps.borderColor ?? "white"
              }`,
              transform: `translate(-50%, -50%) scale(${dragging ? 1.4 : 1})`,
              borderRadius: dragging
                ? inputProps.borderRadius
                  ? inputProps.borderRadius + 1
                  : 2
                : inputProps.borderRadius,
            }}
          />
          {percent > 96 ? (
            <div
              className="glass-range-thumb"
              style={{
                left: `calc(96% + 17px)`,
                transform: `translate(-50%, -50%) scale(${dragging ? 1.4 : 1})`,
                backgroundColor: inputProps.backgroundColor
                  ? inputProps.backgroundColor
                  : inputProps.borderColor
                  ? inputProps.borderColor
                  : "white",
                borderRadius: dragging
                  ? inputProps.borderRadius
                    ? inputProps.borderRadius + 1
                    : 2
                  : inputProps.borderRadius,
              }}
            />
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <>
          <input
            value={inputProps.value}
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
              } ${inputProps.itemsCenter ? "items-center" : ""} ${
                inputProps.contentCenter || inputProps.itemsCenter
                  ? "d-flex"
                  : ""
              } ${
                inputProps.contentClassName ? inputProps.contentClassName : ""
              }`}
            >
              {placeholder}
            </span>
          ) : (
            ""
          )}
        </>
      );
    }
  };

  return (
    <div
      id={inputProps.id}
      key={inputProps.key}
      className={`glass-ui-input-container${
        inputProps.className ? ` ${inputProps.className}` : ""
      }`}
    >
      {label && (
        <label className="glass-ui-input-label" style={{ color: labelColor }}>
          {label}
        </label>
      )}
      <div
        ref={glassInputContainerRef}
        className="glass-ui-container"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{
          color: inputProps.color,
          width: inputProps.width,
          height: type === "range" ? 30 : height,
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
          id,
          inputProps.blur ?? 1,
          inputProps.borderRadius ?? 8,
          inputProps.saturation ?? 100,
          inputProps.brightness ?? 100,
          inputProps.distortion ?? 50,
          inputProps.backgroundColor ?? "white",
          inputProps.backgroundOpacity ?? 0,
          style,
          inputProps.innerLightOpacity ?? 0.2,
          inputProps.outerLightOpacity ?? 0.2,
          inputProps.borderColor ?? inputProps.innerLightColor ?? "white",
          inputProps.borderSize ?? 1,
          inputProps.borderOpacity ?? 1,
          inputProps.chromaticAberration ?? 0,
          inputProps.avoidSvgCreation ?? false,
          type
        )}
        <div
          ref={glassInputContentRef}
          className="glass-ui-input-content"
          style={{
            display: type === "range" ? "flex" : "block",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: inputProps.borderRadius,
          }}
        >
          {renderInput()}
        </div>
      </div>
    </div>
  );
};
