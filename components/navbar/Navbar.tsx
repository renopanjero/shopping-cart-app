import React from "react";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartFill } from "react-icons/pi";

export const Navbar = () => {
  return (
    <div className="flex justify-between mx-auto p-2 container border-b border-white items-center">
      <div className="font-bold text-3xl my-3 cursor-pointer">Acme Store</div>
      <div className="flex m-5 gap-7">
        <CgProfile className="w-8 h-8 cursor-pointer" />
        <PiShoppingCartFill className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
};
