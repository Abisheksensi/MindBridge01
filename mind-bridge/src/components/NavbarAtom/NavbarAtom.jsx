import React from "react";

export const NavbarAtom = ({ text = "About" }) => {
    return (
        <div className="inline-flex items-center justify-center gap-2.5 p-2.5">
            <div className="relative w-fit text-xl font-medium font-[Satoshi] text-dark-blue900">
                {text}
            </div>
        </div>
    );
};