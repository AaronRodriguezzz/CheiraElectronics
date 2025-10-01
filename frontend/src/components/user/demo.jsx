import React from "react";
import HyperSpeedBg from "./HyperSpeedBg";

function Apps() {
  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* Hyperspeed animated background */}
      <HyperSpeedBg />

      {/* Foreground content */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hyperspeed 🚀</h1>
        <p className="text-lg">This content stays on top of the animated background.</p>
      </div>
    </div>
  );
}

export default Apps;
