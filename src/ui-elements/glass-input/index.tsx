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
    inputRangeBlur = 1,
    inputRangeDistortion = 10,
    ...inputProps
  } = { ...glassDefaultProps, ...props };
  const id = useMemo(
    () => inputProps.id ?? crypto.randomUUID(),
    [inputProps.id]
  );
  const glassInputContainerRef = useRef<HTMLDivElement>(null);
  const glassInputContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [style, setStyle] = useState<GlassStyleModel>({
    transform: "none",
    innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
    outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
  });

  useEffect(() => {
    setRangeValue(inputProps.value);
  }, [inputProps.value]);

  useEffect(() => {
    const card = glassInputContainerRef.current;
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
      const result = calculateHoverEffect(point as any, card, inputProps);
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
        innerBoxShadow: `inset 0 0 ${inputProps.innerLightBlur}px ${inputProps.innerLightSpread}px ${inputProps.innerLightColor}`,
        outerBoxShadow: `0 0 ${inputProps.outerLightBlur}px ${inputProps.outerLightSpread}px ${inputProps.outerLightColor}`,
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
      const min = inputProps.min ?? 0;
      const max = inputProps.max ?? 100;
      const step = inputProps.step ?? 1;
      const percent = Math.ceil(((rangeValue - min) / (max - min)) * 100);

      useEffect(() => {
        if (dragging) {
          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("mouseup", handleMouseUp);
          window.addEventListener("touchmove", handleTouchMove, {
            passive: false,
          });
          window.addEventListener("touchend", handleMouseUp);
        } else {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleMouseUp);
        }
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleMouseUp);
        };
      }, [dragging]);

      const handleTouchStart = (e: React.TouchEvent) => {
        setDragging(true);
        updatePosition(e.touches[0].clientX);
      };

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (dragging) updatePosition(e.touches[0].clientX);
      };

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
        const x = Math.min(Math.max(clientX - rect.left - 10, 0), rect.width);
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
          onTouchStart={handleTouchStart}
        >
          <div
            className="glass-range-fill"
            style={{
              width: `${percent}%`,
              backgroundColor:
                inputProps.backgroundColor ?? inputProps.borderColor ?? "white",
              opacity: dragging ? 0.7 : 1,
            }}
          />
          <div
            className="glass-range-after-fill"
            style={{
              left: `calc(${percent > 96 ? 96 : percent}% + 30px)`,
              width: `calc(${100 - percent}% - 30px)`,
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
            onTouchStart={handleTouchStart}
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
                backgroundColor:
                  inputProps.color ??
                  inputProps.backgroundColor ??
                  inputProps.borderColor ??
                  "white",
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
          type === "range" ? inputRangeBlur ?? 1 : inputProps.blur ?? 2,
          inputProps.borderRadius ?? 8,
          inputProps.saturation ?? 100,
          inputProps.brightness ?? 100,
          type === "range"
            ? inputRangeDistortion ?? 10
            : inputProps.distortion ?? 50,
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
