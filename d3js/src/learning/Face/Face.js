import { BackgroundCircle } from "./BackgroundCircle";
import { Eyes } from "./Eyes";
import { Mouth } from "./Mouth";
import { FaceContainer } from "./FaceContainer";

/*
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 0;
const eyeOffsetX = 85;

const mouthWidth = 15;
const mouthRadius = 140;

const eyeOffsetY = 60;
const eyeRadius = 30;

const yellow = "rgba(255, 230, 83, 1)";*/

export const Face = ({
  width,
  height,
  centerX,
  centerY,
  strokeWidth,
  eyeOffsetX,
  eyeOffsetY,
  eyeRadius,
  mouthRadius,
  mouthWidth,
  color,
}) => (
  <FaceContainer
    width={width}
    height={height}
    centerX={centerX}
    centerY={centerY}
  >
    <BackgroundCircle
      radius={centerY - strokeWidth / 2}
      strokeWidth={strokeWidth}
      color={color}
    />
    <Eyes
      eyeOffsetX={eyeOffsetX}
      eyeOffsetY={eyeOffsetY}
      eyeRadius={eyeRadius}
    />
    <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
  </FaceContainer>
);
