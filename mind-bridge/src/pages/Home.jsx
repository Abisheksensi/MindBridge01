import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import HeroSec from '../components/sections/HeroSec/HeroSec';
import QuickOptions from '../components/sections/QuickOptions/QuickOptions';
import BreathingActivity from '../components/sections/BreathingActivity/BreathingActivity';
import MotivateSec from '../components/sections/MotivateSec/MotivateSec';
import TrustSec from '../components/sections/TrustSec/TrustSec';
import Blurellipse2 from '../../src/components/Blurellipse/Blurellipse2';
import  Footer  from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Ellipse3 from '../assets/Elipses/Ellipse3.png';
import Ellipse4 from '../assets/Elipses/Ellipse4.png';
import Ellipse5 from '../assets/Elipses/Ellipse5.png';
import hand1 from '../assets/images/hand1.png';
import hand2 from '../assets/images/hand2.png';

const Home = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Design (Centered) */}
      <div className="absolute inset-0 flex justify-center items-center z-[-1] w-full overflow-hidden">
        <div
          className="relative w-[1242px] h-[1242px] bg-cover"
          style={{ backgroundImage: `url(${Ellipse5})`, top: '-50px' }}
        >
          <div
            className="relative w-[1347px] h-[1499px] top-[-1750px] left-[138px] bg-cover"
            style={{ backgroundImage: `url(${Ellipse4})` }}
          >
            {/* Ellipse 3 */}
            <img
              className="absolute w-[982px] h-[880px] top-[431px] left-[195px]"
              alt="Ellipse"
              src={Ellipse3}
            />
            {/* <Blurellipse2 className="absolute" /> */}
          </div>
        </div>
      </div>

      {/* Hand 1 (Left) */}
      <img
        className="absolute w-[550px] h-auto top-60 opacity-70 animate-float-left"
        alt="Hand 1"
        src={hand1}
      />

      {/* Hand 2 (Right) */}
      <img
        className="absolute w-[600px] h-auto top-1 right-0 opacity-70 animate-float-right"
        alt="Hand 2"
        src={hand2}
      />

      {/* Main Content */}
      <div className="w-full h-full max-w-screen overflow-hidden mx-auto px-4 py-8  relative z-10">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 flex justify-center bg-white">
          <NavBar />
        </div>

        {/* Sections */}
        <div className="flex h-full flex-col items-center justify-center flex-grow">
          <HeroSec />
          <QuickOptions />
          <BreathingActivity />
          <TrustSec />
          <MotivateSec />
          <Footer />
        </div>
      </div>

      {/* Inline CSS for Animations */}
      <style jsx>{`
        @keyframes floatLeft {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes floatRight {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        .animate-float-left {
          animation: floatLeft 4s ease-in-out infinite;
        }

        .animate-float-right {
          animation: floatRight 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
