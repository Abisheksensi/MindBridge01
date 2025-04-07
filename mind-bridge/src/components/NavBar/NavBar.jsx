import React from "react";
import { LogoMini } from "./LogoMini";
import { NavbarAtom } from "./NavbarAtom";
import button from "./button.svg";

const NavBar = () => {
  return (
    <div className="flex w-[1435px] items-center justify-between relative">
      <LogoMini className="bg-[url(/image.png)] !relative" />
      <div className="gap-[34px] inline-flex items-center relative flex-[0_0_auto]">
        <NavbarAtom className="!flex-[0_0_auto]" text="Home" />
        <NavbarAtom className="!flex-[0_0_auto]" text="Community" />
        <NavbarAtom className="!flex-[0_0_auto]" text="About" />
      </div>

      <img className="relative flex-[0_0_auto]" alt="Button" src={button} />
    </div>
  );
};
export default NavBar;

