import React from "react";
import logolight from '../../assets/logo/logolight.png';

const Sidebar = () => {
  return (
    <div className="w-72 bg-gradient-to-b from-blue-50 to-purple-50 h-screen p-4 flex flex-col items-center">
      {/* Top Section: Logo and Button */}
      <div className="flex flex-col items-center">
        {/* Logo and Back Arrow */}
        <div className="flex items-center justify-between mb-6 w-full">
          {/* Back Arrow on the Left */}
          <span className="material-icons text-3xl text-gray-600 cursor-pointer hover:text-gray-800 font-ge">
            chevron_left
          </span>

          {/* Logo in the Center */}
          <div className="flex-1 flex justify-center">
            <img src={logolight} alt="MindBridge Logo" className="w-32 h-auto" />
          </div>

          {/* Empty space on the right to balance the layout */}
          <span className="w-9"></span>
        </div>

        {/* New Conversation Button */}
        <button
          className="relative px-6 py-4 bg-slate-800 rounded-2xl inline-flex justify-center items-center gap-2.5 gradient-stroke-darkblue"
          onClick={() => console.log("Start new conversation")}
        >
          <span className="material-icons text-white text-l">edit</span>
          <div className="text-white text-l font-bold font-[Satoshi]">
            New Conversation !
          </div>
        </button>
      </div>

      {/* Spacer to push navigation links to the bottom */}
      <div className="flex-1"></div>

      {/* Bottom Section: Navigation Links */}
      <nav className="flex flex-col gap-6 items-center">
        <div className="w-full">
        <a href="#" className="font-regular font-[Satoshi] flex items-center gap-6 text-gray-700 hover:text-blue-600">
          <span className="material-icons">favorite</span>
          Consultations
        </a>
        </div>
        <div className="w-full">
        <a href="#" className="font-regualr font-[Satoshi] flex items-center gap-6 text-gray-700 hover:text-blue-600">
          <span className="material-icons">help_outline</span>
          Questions
        </a>
        </div>
        <div className="w-full">
        <a href="#" className="font-regular font-[Satoshi] w-full flex items-center gap-6 text-gray-700 hover:text-blue-600">
          <span className="material-icons">sports_esports</span>
          Play games
        </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;