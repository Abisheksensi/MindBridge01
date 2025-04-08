import React from "react";
import { LogoMini } from "../LogoMini/LogoMini";
import { NavbarAtom } from "../NavbarAtom/NavbarAtom";
import { ButtonPrimary } from "../Buttons/ButtonPrimary/ButtonPrimary";

const NavBar = () => {
  return (
    <div className="flex w-[1435px] items-center justify-between relative">
      <LogoMini className="bg-[url(/image.png)] !relative" />
      <div className="gap-[34px] inline-flex items-center relative flex-[0_0_auto]">
        <NavbarAtom  text="Home" />
        <NavbarAtom  text="Community" />
        <NavbarAtom text="About" />
      </div>

      <ButtonPrimary/>
    </div>
  );
};
export default NavBar;
