// MotivateSec.jsx
import React, { useState, useEffect } from "react";
import MotivateCard from "../../MotivateCard/MotivateCard";
import Dp1 from "../../../assets/persons/Dp1.png";
import Dp2 from "../../../assets/persons/Dp2.png";
import Dp3 from "../../../assets/persons/Dp3.png";
import fadeimage1 from "../../../assets/persons/fadeimage1.png";
import fadeimage2 from "../../../assets/persons/fadeimage2.png";
import fadeimage3 from "../../../assets/persons/fadeimage3.png";

const MotivateSec = () => {
  const testimonials = [
    {
      profileImage: Dp1,
      backgroundImage: fadeimage1,
      quote:
        "The life you have left is a gift. Cherish it. Enjoy it now, to the fullest. Do what matters, now.",
      author: "Leo Babauta",
    },
    {
      profileImage: Dp2,
      backgroundImage: fadeimage2,
      quote:
        "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
      author: "Maya Angelou",
    },
    {
      profileImage: Dp3,
      backgroundImage: fadeimage3,
      quote:
        "In the end, it’s not the years in your life that count. It’s the life in your years.",
      author: "Abraham Lincoln",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-12">
      <div className="relative w-full h-[400px] flex justify-center items-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <MotivateCard
              profileImage={testimonial.profileImage}
              backgroundImage={testimonial.backgroundImage}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivateSec;