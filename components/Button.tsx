import React, { FC } from "react";
import { PiShoppingCartFill } from "react-icons/pi";

interface IButton {
  onClick: () => void;
  text?: string;
}

const Button: FC<IButton> = ({ onClick, text = "Add" }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="border-black bg-gray-300 text-gray-600 hover:bg-white hover:text-black font-bold w-18 py-1 px-2 rounded-lg flex "
      >
        <PiShoppingCartFill className="w-5 h-5 hover:text-black " />
        {text}
      </button>
    </div>
  );
};

export default Button;
