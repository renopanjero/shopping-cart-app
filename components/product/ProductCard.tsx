import { Currency, CurrencyKey, Item } from "@/common/types";
import Image from "next/image";
import React, { FC } from "react";
import Button from "../Button";
import { useCurrencies } from "@/hooks/use-currencies";

interface IProductCard {
  item: Item;
  addCart: (item: Item) => void;
  selectedCurrency: Currency;
  cart: Item | undefined;
  handleSubtractCart: (cart: Item) => void;
  handleAddCart: (cart: Item) => void;
  convertCurrencies: (
    price: number,
    fromCurrency: CurrencyKey,
    toCurrency: CurrencyKey
  ) => number;

  quantity: number;
  handleAdd: (id: string, item: Item) => void;
  handleRemove: (id: string) => void;
}

export const ProductCard: FC<IProductCard> = ({
  item,
  addCart,
  selectedCurrency,
  cart,
  handleSubtractCart,
  handleAddCart,
  convertCurrencies,

  handleAdd,
}) => {
  const { currencies } = useCurrencies();

  const prevCurrencySymbol = currencies.find(
    (cur) => cur.key === item.priceCurrency
  )?.symbol;

  const convertedPrice = convertCurrencies(
    item.price,
    item.priceCurrency,
    selectedCurrency.key
  );

  const formattedPrice = convertedPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="rounded-xl">
      <div className="bg-white w-full h-full rounded-md flex flex-col justify-between">
        <div>
          <Image
            className="w-full rounded-t-md"
            src={item.imageSrc}
            alt={item.title}
            width={150}
            height={150}
          />
          <div className="p-4 flex flex-col justify-between">
            <h2 className="font-bold text-lg text-gray-950">{item.title}</h2>
            <p className="text-gray-600 py-2">{item.description}</p>
            <div className="gap-2 flex">
              <p className="text-black font-bold text-xl">
                {selectedCurrency.symbol ?? prevCurrencySymbol}
                {formattedPrice}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          {!cart ? (
            <Button
              onClick={() => {
                addCart(item);
                handleAdd(item.id, item);
              }}
            />
          ) : (
            <div className="flex items-center flex-row justify-between border-gray-500 border text-black text-xl w-20 py-0 rounded-md ">
              <button
                onClick={() => handleSubtractCart(cart)}
                className="hover:bg-gray-300 rounded-md h-full w-full "
              >
                -
              </button>
              <span className="mx-2">{cart.qty}</span>
              <button
                onClick={() => handleAddCart(cart)}
                className="hover:bg-gray-300 rounded-md h-full w-full "
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
