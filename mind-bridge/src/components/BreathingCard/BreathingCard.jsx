import React from "react";

const BreathingCard = ({ className, title, description, image }) => {
  return (
    <div
      className={`w-[672px] inline-flex items-start gap-4 p-8 relative bg-white rounded-2xl overflow-hidden border-[none] ${className}`}
    >
      <img
        className="relative w-[42px] h-[42px]"
        alt="Icon"
        src={image}
      />

      <div className="flex flex-col items-start gap-1 relative"></div>
      <div className="flex flex-col items-start gap-4 realtive ">
        <p className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#2d3048] text-2xl tracking-[0] leading-[normal]">
          {title}
        </p>

        <p className="relative self-stretch [font-family:'Satoshi-Regular',Helvetica] font-normal text-dark-blue700 text-2xl tracking-[0] leading-[normal]">
          {description}
        </p>
        </div>

        <div className="absolute w-[196px] h-[193px] top-[-17px] left-[443px] rounded-[98px/96.5px] blur-[100px] [background:linear-gradient(90deg,rgba(68,222,255,1)_0%,rgba(203,165,209,1)_50%,rgba(227,25,92,1)_75%)] opacity-30" />
      </div>

  );
};

export default BreathingCard;
