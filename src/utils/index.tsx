import { useMemo } from "react";
import { distortionMap } from "../assets/normal-maps";
import type { GlassStyleModel } from "../models";
import "./utils.css";

export const renderLayers = (
  blur: number,
  borderRadius: number,
  saturation: number,
  distortion: number,
  backgroundColor: string,
  backgroundOpacity: number,
  style: GlassStyleModel,
  innerLightOpacity: number,
  outerLightOpacity: number,
  borderColor: string,
  borderSize: number
) => {
  const id = useMemo(() => crypto.randomUUID(), []);

  return (
    <>
      <svg
        style={{
          borderRadius,
        }}
        className="glass-ui-svg"
      >
        <defs>
          <filter
            id={`${id}-filter`}
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              id="feimage"
              x="0"
              y="0"
              width="100%"
              height="100%"
              href={distortionMap}
              result="distortedImage"
              preserveAspectRatio="xMidYMid slice"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="distortedImage"
              x="0"
              y="0"
              width="100%"
              height="100%"
              scale={-distortion}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>
      <span
        className="glass-ui-border-layer"
        style={{
          borderRadius,
          border: `${borderSize}px solid ${borderColor}`,
        }}
      />
      <span
        className="glass-ui-inner-light"
        style={{
          borderRadius,
          boxShadow: style.innerBoxShadow,
          opacity: innerLightOpacity,
          border: `${borderSize}px solid ${borderColor}`,
        }}
      />
      <div
        className="glass-ui-background-layer"
        style={{
          borderRadius,
          opacity: `${backgroundOpacity}`,
          backgroundColor: `${backgroundColor}`,
        }}
      ></div>
      <div
        className="glass-ui-distortion-layer"
        style={{
          borderRadius,
          filter: `url(#${id}-filter)`,
          backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
        }}
      />
      <span
        className="glass-ui-outer-light"
        style={{
          borderRadius,
          boxShadow: style.outerBoxShadow,
          opacity: outerLightOpacity,
          border: `${borderSize}px solid ${borderColor}`,
        }}
      />
    </>
  );
};
