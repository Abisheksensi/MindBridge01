// Footer.jsx
import React from "react";
import logolight from "../../assets/logo/logolight.png";
import facebookBlack from "../../assets/images/facebook-black.png";
import Shape from "../../assets/images/Shape.png";
import twitterBlack from "../../assets/images/twitter-black.png";
import vimeoBlack from "../../assets/images/vimeo-black.png";

export const Footer = () => {
  return (
    <div className="w-[1728px] h-[644px] bg-[#ffffff]">
      <div className="relative h-[529px]">
        <img
          className="absolute w-[1728px] h-[209px] top-0 left-0 object-cover"
          alt="Shape"
          src={Shape}
        />

        <div className="inline-flex flex-col items-center gap-9 absolute top-[109px] left-[304px]">
          <div className="relative w-[1112px] h-[212px]">
            <div className="relative w-[1189px] h-[266px] -left-11">
              {/* Replaced shadow.svg with CSS shadow */}
              <div
                className="absolute w-[1189px] h-[149px] top-[118px] left-0"
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  filter: "blur(20px)",
                }}
              />

              <div className="inline-flex flex-col items-start gap-2.5 px-[92px] py-16 absolute top-0 left-[55px] bg-dark-blue900 rounded-[10px]">
                <div className="inline-flex items-center gap-[67px] relative flex-[0_0_auto]">
                  <div className="relative w-fit font-['General_Sans'] font-medium text-white text-[31px] tracking-[0] leading-[normal]">
                    Subscribe Newsletters
                  </div>

                  <div className="relative w-[521px] h-[74px]">
                    <div className="relative w-[523px] h-[76px] -top-px -left-px rounded">
                      <input
                        className="w-[523px] px-6 py-[26px] absolute top-0 left-0 bg-[#ffffff] rounded border-[none] font-['Satoshi'] font-medium text-[#2b3d51] text-[16px] tracking-[0] leading-[normal]"
                        placeholder="Enter your email"
                        type="email"
                      />

                      <div className="inline-flex items-start gap-2.5 px-[38px] py-4 absolute top-2.5 left-[322px] bg-lift-blue rounded">
                        <div className="relative w-fit [font-family:'DM_Sans-Regular',Helvetica] font-normal text-[#ffffff] text Angled text-[16px] text-center tracking-[0] leading-[normal]">
                          Subscribe Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex flex-col items-start gap-[29px] relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-end gap-12 relative flex-[0_0_auto]">
                <div className="inline-flex items-end gap-[389px] relative flex-[0_0_auto]">
                  <div className="inline-flex items-start gap-[77px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-base tracking-[0] leading-[normal]">
                      About us
                    </div>

                    <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-base tracking-[0] leading-[normal]">
                      Discover
                    </div>

                    <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-base tracking-[0] leading-[normal]">
                      Explore
                    </div>

                    <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-base tracking-[0] leading-[normal]">
                      Books
                    </div>
                  </div>

                  <div className="relative w-[216px] h-6">
                    <img
                      className="absolute w-6 h-6 top-0 left-0"
                      alt="Facebook black"
                      src={facebookBlack}
                    />

                    <img
                      className="absolute w-6 h-[21px] top-0.5 left-32"
                      alt="Vimeo black"
                      src={vimeoBlack}
                    />

                    <img
                      className="absolute w-6 h-5 top-0.5 left-16"
                      alt="Twitter black"
                      src={twitterBlack}
                    />

                    <div className="absolute w-6 h-[17px] top-1 left-48 bg-[url(/youtube.svg)] bg-[100%_100%]" />
                  </div>
                </div>

                {/* Replaced line-2.svg with CSS border */}
                <div className="relative w-[1074px] h-px bg-gray-300" />
              </div>

              <div className="inline-flex items-center gap-[258px] relative flex-[0_0_auto]">
                <p className="relative w-fit opacity-75 [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-sm tracking-[0] leading-[normal]">
                  © 2025 Mind Bridge. All rights reserved.
                </p>
                            <img
              className="w-[100px] h-auto"
              alt="Logo Light"
              src={logolight}
            />
                <div className="inline-flex items-start gap-[30px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-sm tracking-[0] leading-[normal]">
                    Terms of Service
                  </div>
                            <div className="absolute top-4 left-4">
          </div>

                  <div className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans-Medium',Helvetica] font-medium text-dark text-sm tracking-[0] leading-[normal]">
                    Privacy Policy
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;