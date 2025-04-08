// BreathingActivity.jsx
import React from "react";
import clock from "../../../assets/images/clock.png";
import BreathingCard from "../../BreathingCard/BreathingCard";
import BreathingCircle from "../../BreathingCircle/BreathingCircle";

const BreathingActivity = () => {
  return (
    <div className="flex flex-col items-center gap-18 py-12">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-['General_Sans'] font-semibold text-dark-blue900 text-5xl text-center">
          Take a Quick Breath Activity!
        </h2>
        <p className="font-[Satoshi] font-normal text-dark-blue900 text-2xl text-center">
          A one-minute break to calm your heart. So let’s try fast enough to fit anywhere.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-16 w-full">
        <BreathingCircle />
        <BreathingCard
          className="custom-class"
          title="Relaxation"
          description="Follow the breathing pattern to relax your mind.And we think to havedfdsfsdsdfsdfasfsfsdfsdfsdfsdfsdfsdfsdfsdf"
          image={clock}
        />
      </div>
    </div>
  );
};

export default BreathingActivity;