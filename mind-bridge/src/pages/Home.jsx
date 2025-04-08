import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import HeroSec from '../components/sections/HeroSec/HeroSec';
import QuickOptions from '../components/sections/QuickOptions/QuickOptions';
import BreathingActivity from '../components/sections/BreathingActivity/BreathingActivity';
import MotivateSec from '../components/sections/MotivateSec/MotivateSec';
import TrustSec from '../components/sections/TrustSec/TrustSec';
import { Footer } from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Ellipse3 from '../assets/Elipses/Ellipse3.png';
import Ellipse4 from '../assets/Elipses/Ellipse4.png';
import Ellipse5 from '../assets/Elipses/Ellipse5.png';
import hand1 from '../assets/images/hand1.png';
import hand2 from '../assets/images/hand2.png';

const Home = () => {
  console.log("Home is rendering");
  return (
    <div className="relative min-h-screen">
      {/* Background Design (Centered) */}
                  {/* Hand 1 (Left) */}
            <img
              className="absolute w-132 h-auto top-60  opacity-70"
              alt="Hand 1"
              src={hand1}
            />
            {/* Hand 2 (Right) */}
            <img
              className="absolute w-142 h-auto top-1 right-0  opacity-70"
              alt="Hand 2"
              src={hand2}
            />
      <div className="fixed inset-0 flex justify-center items-center z-[-1]">
        <div className="relative w-[1242px] h-[1242px] bg-cover" style={{ backgroundImage: `url(${Ellipse5})`, top: '50px' }}>
          <div className="relative w-[1347px] h-[1499px] top-[-150px] left-[138px] bg-cover" style={{ backgroundImage: `url(${Ellipse4})` }}>
            {/* Ellipse 3 */}
            <img
              className="absolute w-[982px] h-[880px] top-[531px] left-[195px]"
              alt="Ellipse"
              src={Ellipse3}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 min-h-screen relative z-10">
        <div className="sticky top-0 z-50 flex justify-center">
          <NavBar />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          <HeroSec />
          <QuickOptions />
          <BreathingActivity/>
          <TrustSec/>
          <MotivateSec/>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Home;