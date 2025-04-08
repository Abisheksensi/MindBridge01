import React from "react";

const Quickoptioncard = ({
  imageSrc = "default-image.png",
  title = "Option Title",
  description = "Option description goes here.",
}) => {
  return (
    <div className="flex flex-col w-80 items-start gap-6 p-4 bg-white rounded-3xl shadow-[0px_8px_18px_rgba(231,179,255,0.1),0px_33px_33px_rgba(231,179,255,0.09),0px_74px_45px_rgba(231,179,255,0.05),0px_132px_53px_rgba(231,179,255,0.02)]">
      <img
        className="w-full h-48 object-cover rounded-2xl"
        alt={title}
        src={imageSrc}
      />
      <div className="flex flex-col items-center gap-3 px-3 py-0 w-full">
        <h3 className="font-satoshi font-bold text-dark-blue900 text-2xl text-center">
          {title}
        </h3>
        <p className="font-satoshi font-normal text-dark-blue900 text-base text-center">
          {description}
        </p>
      </div>
      <button className="w-full px-6 py-3 bg-dark-blue900 text-white font-satoshi font-bold text-base rounded-xl">
        Wanna Talk!
      </button>
    </div>
  );
};

export default Quickoptioncard;