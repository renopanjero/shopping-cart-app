import { Currency, Item } from "@/common/types";
import React, { FC } from "react";

interface ICheckout {
  carts: Item[];
  totalPrice: {
    total: number;
    symbol: string;
  };
  selectedCurrency: Currency;
  hideCheckout: () => void;
  clearCart: () => void;
}

const Checkout: FC<ICheckout> = ({
  carts,
  totalPrice,
  selectedCurrency,
  hideCheckout,
  clearCart,
}) => {
  const handleConfirmCheckout = () => {
    clearCart();
    window.open("/thank_you", "blank");
    hideCheckout();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
      <div className=" bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        {carts.length === 0 ? (
          <div className="text-center text-white space-y-16">
            <div></div>
            <p className="text-2xl">
              Your cart is still empty, please purchase.😊😊😊
            </p>
            <button
              onClick={hideCheckout}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white w-full"
            >
              Back
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-white text-3xl font-bold mb-4">Checkout</h2>
            <ul className="space-y-3">
              {carts.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span className="text-xl">
                    {item.title} x {item.qty}
                  </span>
                  <span className="text-xl">
                    {selectedCurrency.symbol}
                    {(item.price * (item.qty ? item.qty : 1)).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-right">
              <h3 className="text-2x  l font-bold">
                Total: {totalPrice.symbol}
                {totalPrice.total.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white"
                onClick={hideCheckout}
              >
                Cancel
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white"
                onClick={handleConfirmCheckout}
              >
                Confirm Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
