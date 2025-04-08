// TrustCard.jsx
import React from "react";

const TrustCard = ({
  icon,
  title = "Built on Unshaken Care",
  description = "Every tool, every word is crafted to hold you gently—your peace is our foundation.",
  className,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-12 pt-0 pb-6 px-4 md:px-0 border-b border-dark-blue100 ${className}`}
    >
      {icon}
      <div className="flex flex-col w-full md:w-[740px] items-center md:items-start gap-3 md:gap-[13px]">
        <div className="font-['General_Sans'] font-medium text-dark-blue900 text-[22px] md:text-[31px] leading-snug">
          {title}
        </div>
        <p className="font-['Satoshi'] font-medium text-dark-blue700 text-[15px] md:text-[20px] leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TrustCard;
