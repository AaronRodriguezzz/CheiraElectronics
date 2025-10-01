import React from "react";
import Hyperspeed from "./HyperSpeed";

const HyperSpeedBg = () => {
  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => {},
          onSlowDown: () => {},
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x111111, // dark gray road
            islandColor: 0x1a1a1a, // slightly lighter median
            background: 0x000000, // full black backdrop
            shoulderLines: 0xffffff, // keep white for contrast
            brokenLines: 0xffffff, // keep white
            leftCars: [0xf97316, 0xffa94d, 0xfb923c], // orange shades (orange-500 variations)
            rightCars: [0xf97316, 0xffb866, 0xff8c1a], // more orange tones
            sticks: 0xf97316, // glowing orange sticks
          },
        }}
      />
    </div>
  );
};

export default HyperSpeedBg;
