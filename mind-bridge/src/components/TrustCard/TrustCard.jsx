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
      className={`inline-flex items-center gap-12 pt-0 pb-4 px-0 relative border-b [border-bottom-style:solid] border-dark-blue100 ${className}`}
    >
      {icon}
      <div className="flex flex-col w-[740px] items-start gap-[13px] relative">
        <div className="relative self-stretch mt-[-1.00px] font-['General_Sans'] font-medium text-dark-blue900 text-[31px] tracking-[0] leading-[normal]">
          {title}
        </div>

        <p className="relative self-stretch font-['Satoshi'] font-medium text-dark-blue700 text-[20px] tracking-[0] leading-[normal]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TrustCard;