import React from "react";
import { PiShoppingCartFill } from "react-icons/pi";
const ThankYou = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Thank You for Your Purchase
          <span className="inline-flex items-center">
            <PiShoppingCartFill className="text-3xl" />
          </span>
          !
        </h1>
        <p className="text-lg">
          We appreciate your business and hope to see you again soon.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
