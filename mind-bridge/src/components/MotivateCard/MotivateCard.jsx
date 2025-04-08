import React from "react";
import Ellipse7 from "../MotivateCard/Ellipse7.png"; // Common image for all cards

const MotivateCard = ({
  profileImage, // Prop for profile picture (e.g., ellipse6 or ellipse62)
  backgroundImage, // Prop for background image (e.g., group3 or image)
  quote, // Prop for the testimonial quote
  author, // Prop for the author name
  className, // Optional additional classes
}) => {
  return (
    <div
      className={`border-[none] inline-flex items-start gap-8 p-8 overflow-hidden rounded-[32px] bg-white relative ${className}`}
    >
      {/* Background Image (passed as prop) */}
      <img
        className="w-[337px] h-[339px] left-[793px] top-0 absolute"
        alt="Group"
        src={backgroundImage}
      />

      {/* Profile Image (passed as prop) */}
      <img
        className="w-[151px] object-cover h-[151px] relative"
        alt="Ellipse"
        src={profileImage}
      />

      {/* Quote and Author */}
      <div className="w-[883px] flex flex-col items-start gap-4 relative">
        <div className="[font-family:'General_Sans-Semibold',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-9xl text-dark-blue900 font-normal leading-[normal] relative">
          “
        </div>

        <div className="[font-family:'General_Sans-Regular',Helvetica] w-fit tracking-[0] text-[32px] text-dark-blue900 font-normal leading-[normal] relative">
          <p>{quote}</p>
        </div>

        <div className="[font-family:'General_Sans-Regular',Helvetica] w-fit tracking-[0] text-xl text-[#555555] font-normal leading-[normal] relative">
          — {author}
        </div>
      </div>

      {/* Common Ellipse7 Image (always present) */}
      <img
        className="absolute w-[396px] h-[339px] top-0 left-[734px]"
        alt="Ellipse"
        src={Ellipse7}
      />

      {/* Gradient Blur Effect (always present) */}
      <div className="absolute w-[196px] h-[193px] top-0 left-[934px] rounded-[98px/96.5px] blur-[100px] [background:linear-gradient(90deg,rgba(68,222,255,1)_0%,rgba(89,154,246,1)_19%,rgba(203,165,209,1)_50%,rgba(227,25,92,1)_75%,rgba(113,0,35,1)_91%)] opacity-30" />
    </div>
  );
};

export default MotivateCard;