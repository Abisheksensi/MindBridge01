import React from "react";
import Quickoptioncard from "../../Quickoptioncard/Quickoptioncard";

const QuickOptions = () => {
  return (
    <div className="flex flex-col items-center gap-16 py-12">
      {/* Title and Subtitle */}
      <div className="w-[1107px] flex flex-col items-center gap-4">
        <h2 className="text-center font-['General_Sans'] font-semibold text-dark-blue900 text-5xl">
          Ways to Feel Better
        </h2>
        <p className="text-center font-satoshi font-normal text-dark-blue700 text-2xl">
          Find help that fits you safe, simple, and here for you
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-16">
        <Quickoptioncard
          imageSrc="https://placehold.co/321x222" // Replace with actual image
          title="Talk to a Doctor"
          description="Connect with a licensed professional for a private consultation—available through video or voice, booked right from the platform."
        />
        <Quickoptioncard
          imageSrc="https://placehold.co/321x222" // Replace with actual image
          title="Join Our Community"
          description="Share your thoughts or find strength in others’ stories—an anonymous, moderated space to connect on the Community page."
        />
        <Quickoptioncard
          imageSrc="https://placehold.co/321x222" // Replace with actual image
          title="Call Help Now"
          description="Immediate support, 24/7—reach out anytime"
        />
      </div>
    </div>
  );
};

export default QuickOptions;