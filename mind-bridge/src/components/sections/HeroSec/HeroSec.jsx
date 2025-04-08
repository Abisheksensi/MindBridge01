import React from "react";
import { ButtonPrimary } from "../../Buttons/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";

const HeroSec = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="text-center">
                <p className="[font-[General Sans] font-bold text-[#2d3048] text-[95px] tracking-[0] leading-[normal]">
                    You are not alone <br />“ We are here to help ”
                </p>
                <div className="mt-8">
                    <Link to="/ai-chat">
                        <ButtonPrimary />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSec;

