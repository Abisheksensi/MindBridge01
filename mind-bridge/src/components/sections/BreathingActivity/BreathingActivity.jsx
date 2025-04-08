// BreathingActivity.jsx
import React from "react";
import BreathingCard from "../../BreathingCard/BreathingCard";
import BreathingCircle from "../../BreathingCircle/BreathingCircle";

const BreathingActivity = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <h2 className="font-['General_Sans'] font-semibold text-dark-blue900 text-5xl text-center">
        Take a Quick Breath Activity!
      </h2>
      <p className="font-satoshi font-normal text-dark-blue700 text-2xl text-center">
        A one-minute break to calm your heart. So let’s try fast enough to fit anywhere.
      </p>
      <div className="flex flex-row items-center justify-center gap-8">
        <BreathingCircle />
        <BreathingCard />
      </div>
    </div>
  );
};

export default BreathingActivity;