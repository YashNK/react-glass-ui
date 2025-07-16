import { useMemo } from "react";
import { distortionMap } from "../assets/normal-maps";
import type { GlassStyleModel } from "../models";
import "./utils.css";

type LightEffectProps = {
  flexibility?: number;
  onHoverScale?: number;
  innerLightBlur?: number;
  innerLightSpread?: number;
  innerLightColor?: string;
  outerLightBlur?: number;
  outerLightSpread?: number;
  outerLightColor?: string;
};

type HoverEffectResult = {
  transform: string;
  innerBoxShadow: string;
  outerBoxShadow: string;
};

export const renderLayers = (
  id: string,
  blur: number,
  borderRadius: number,
  saturation: number,
  brightness: number,
  distortion: number,
  backgroundColor: string,
  backgroundOpacity: number,
  style: GlassStyleModel,
  innerLightOpacity: number,
  outerLightOpacity: number,
  borderColor: string,
  borderSize: number,
  borderOpacity: number,
  chromaticAberration: number,
  avoidSvgCreation: boolean,
  type?: string
) => {
  console.log("rerender");
  return (
    <>
      {distortion && !avoidSvgCreation ? (
        <svg style={{ borderRadius }} className="glass-ui-svg">
          {" "}
          <clipPath id={`${id}-clip`}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx={0}
              ry={borderRadius}
            />
          </clipPath>
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
                x="0%"
                y="0"
                width="100%"
                height="100%"
                href={distortionMap}
                result="originalMap"
                preserveAspectRatio="xMidYMid slice"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="originalMap"
                scale={distortion}
                xChannelSelector="R"
                yChannelSelector="G"
                result="distortedOutput"
              />
              <feColorMatrix
                in="distortedOutput"
                type="matrix"
                values="1 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0"
                result="r"
              />
              <feOffset
                in="r"
                dx={-chromaticAberration}
                dy="0"
                result="rOffset"
              />
              <feColorMatrix
                in="distortedOutput"
                type="matrix"
                values="0 0 0 0 0
              0 1 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
                result="g"
              />
              <feOffset in="g" dx="0" dy="0" result="gOffset" />
              <feColorMatrix
                in="distortedOutput"
                type="matrix"
                values="0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
                result="b"
              />
              <feOffset
                in="b"
                dx={chromaticAberration}
                dy="0"
                result="bOffset"
              />
              <feBlend in="rOffset" in2="gOffset" mode="screen" result="rgb1" />
              <feBlend
                in="rgb1"
                in2="bOffset"
                mode="screen"
                result="finalRender"
              />
              <feComposite in="finalRender" in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
        </svg>
      ) : (
        ""
      )}
      {type === "range" ? (
        ""
      ) : (
        <>
          {borderSize ? (
            <span
              className="glass-ui-border-layer"
              style={{
                borderRadius,
                border: `${borderSize}px solid ${borderColor}`,
                opacity: borderOpacity,
              }}
            />
          ) : (
            ""
          )}
          {innerLightOpacity ? (
            <span
              className="glass-ui-inner-light"
              style={{
                borderRadius,
                boxShadow: style.innerBoxShadow,
                opacity: innerLightOpacity,
              }}
            />
          ) : (
            ""
          )}
          {backgroundOpacity ? (
            <div
              className="glass-ui-background-layer"
              style={{
                borderRadius,
                opacity: `${backgroundOpacity}`,
                backgroundColor: `${backgroundColor}`,
              }}
            />
          ) : (
            ""
          )}
          {distortion || blur || saturation || brightness ? (
            <div
              className="glass-ui-distortion-layer"
              style={{
                borderRadius,
                clipPath: `url(#${id}-clip)`,
                WebkitClipPath: `url(#${id}-clip)`,
                filter: `url(#${id}-filter)`,
                backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
                WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
              }}
            />
          ) : (
            ""
          )}
          {outerLightOpacity ? (
            <span
              className="glass-ui-outer-light"
              style={{
                borderRadius,
                boxShadow: style.outerBoxShadow,
                opacity: outerLightOpacity,
              }}
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export function calculateHoverEffect(
  e: MouseEvent,
  card: HTMLElement,
  props: LightEffectProps
): HoverEffectResult {
  const {
    flexibility = 0,
    onHoverScale = 1,
    innerLightBlur = 0,
    innerLightSpread = 0,
    innerLightColor = "white",
    outerLightBlur = 0,
    outerLightSpread = 0,
    outerLightColor = "white",
  } = props;
  let transform = "none";
  if (flexibility > 0) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const scaleFactor = flexibility / 100;
    const translateX = Math.cos(angle) * distance * scaleFactor;
    const translateY = Math.sin(angle) * distance * scaleFactor;
    let stretchX = 1;
    let stretchY = 1;
    if (onHoverScale) {
      stretchX = onHoverScale + Math.abs(translateX) / rect.width;
      stretchY = onHoverScale + Math.abs(translateY) / rect.height;
    }
    transform = `translate(${translateX}px, ${translateY}px) scale(${stretchX}, ${stretchY})`;
  }
  return {
    transform,
    innerBoxShadow: `inset 0px 0px ${innerLightBlur}px ${innerLightSpread}px ${innerLightColor}`,
    outerBoxShadow: `0 0 ${outerLightBlur}px ${outerLightSpread}px ${outerLightColor}`,
  };
}
