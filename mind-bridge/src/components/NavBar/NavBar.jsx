import React, { useState } from "react";
import logolight from "../../assets/logo/logolight.png";
import { NavbarAtom } from "../NavbarAtom/NavbarAtom";
import { ButtonPrimary } from "../Buttons/ButtonPrimary/ButtonPrimary";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex w-full max-w-[1435px] items-center justify-between relative px-4 py-4">
      {/* Logo */}
      <img src={logolight} alt="Logo" className="w-[72px] h-auto" />

      {/* Burger Icon (Visible on Mobile) */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <svg
          className="w-6 h-6 text-dark-blue900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links and Button */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-[34px] items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 z-10 md:flex-[0_0_auto]`}
      >
        <NavbarAtom text="Home" />
        <NavbarAtom text="Community" />
        <NavbarAtom text="About" />
        {/* ButtonPrimary at the bottom on mobile */}
        <div className="mt-4 md:mt-0">
          <ButtonPrimary />
        </div>
      </div>
    </div>
  );
};

export default NavBar;