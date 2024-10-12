import { Currency, CurrencyKey, Item } from "@/common/types";
import Image from "next/image";
import React, { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ICart {
  item: Item;
  removeCart: (itemId: string) => void;
  selectedCurrency: Currency;
  currencies: Currency[];
  convertCurrencies: (
    price: number,
    fromCurrency: CurrencyKey,
    toCurrency: CurrencyKey
  ) => number;
  handleAddCart: (cart: Item) => void;
  handleSubtractCart: (cart: Item) => void;
}

const Cart: FC<ICart> = ({
  item,
  removeCart,
  selectedCurrency,
  convertCurrencies,
}) => {
  const defaultCurrency: Currency = {
    key: "usd",
    symbol: "$",
    usdCoef: 1,
  };

  const activeCurrency = selectedCurrency || defaultCurrency;

  const quantity = item.qty ?? 1;

  const convertedPrice = convertCurrencies(
    item.price,
    item.priceCurrency,
    activeCurrency.key
  );

  const totalPrice = convertedPrice * quantity;

  const formattedPrice = totalPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="col-span-4 p-4 bg-white rounded-md relative mx-3">
      <IoCloseSharp
        onClick={() => removeCart(item.id)}
        className="w-5 h-5 cursor-pointer absolute top-4 right-4 text-gray-800"
      />
      <div className="flex flex-col md:flex-row items-center item gap-4">
        <Image
          className="w-32 h-32 md:w-32 md:h-32 object-cover rounded-md "
          src={item.imageSrc}
          alt={item.title}
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-between w-full">
          <h2 className=" font-bold text-gray-950 text-lg md:text-xl">
            {item.title}
          </h2>
          <p className="text-gray-600 md:py-2 py-1 text-sm md:text-base">
            {item.description}
          </p>
          <div className="flex justify-between items-center w-full mt-2">
            <p
              id="quantity"
              className="text-black font-bold text-sm md:text-base"
            >
              Qty: {item.qty}
            </p>
            <p className="text-black text-right text-xl md:text-2xl font-bold">
              {activeCurrency.symbol}
              {formattedPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
