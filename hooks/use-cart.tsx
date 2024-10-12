import { Currency, Item } from "@/common/types";
import { useState } from "react";
import { useCurrencies } from "./use-currencies";

export const useCart = () => {
  const [carts, setCarts] = useState<Item[]>([]);

  const { convertCurrencies } = useCurrencies();

  const addCart = (item: Item) => {
    const isItemInCart = carts.some((cart) => cart.id === item.id);
    if (!isItemInCart) {
      setCarts([...carts, { ...item, qty: 1 }]);
    }
  };

  const removeCart = (itemId: string) => {
    const updatedCarts = carts.filter((item) => item.id !== itemId);
    setCarts(updatedCarts);
  };

  const getTotalPrice = (selectedCurrecy: Currency) => {
    const cartList = carts?.map((cart) => {
      const newPrice = convertCurrencies(
        cart.price,
        cart.priceCurrency,
        selectedCurrecy.key
      );

      return { ...cart, price: newPrice * (cart.qty ?? 1) };
    });

    const total = cartList?.reduce((acc, curr) => acc + curr.price, 0);
    const newPriceSymbol =
      selectedCurrecy && selectedCurrecy.symbol !== undefined
        ? selectedCurrecy.symbol
        : "$";

    return {
      total,
      symbol: newPriceSymbol,
      selectedCurrecy,
    };
  };

  const handleSubtractCart = (cart: Item) => {
    if (!cart) return;
    // TODO: find cart from carts and update qty
    const payload = carts.find((c) => c.id === cart.id);
    // TODO: check if cart.qty less then 1, return null
    if (payload) payload["qty"] = cart.qty! - 1;

    if (payload?.qty === 0) {
      setCarts((prevCarts) => prevCarts.filter((c) => c.id !== cart.id));
      // TODO: remove cart from carts
    } else {
      setCarts((prevCarts) =>
        prevCarts.map((c) =>
          c.id === cart.id ? { ...c, qty: payload?.qty } : c
        )
      );
      // TODO: update carts
    }
  };

  const handleAddCart = (cart: Item) => {
    if (!cart) return;
    const newCart = [...carts];
    newCart.forEach((c) => {
      if (c.id === cart.id) {
        c.qty = (c.qty ?? 0) + 1;
      }
    });
    setCarts(newCart);
  };

  const clearCart = () => {
    setCarts([]);
  };

  return {
    carts,
    addCart,
    removeCart,
    getTotalPrice,
    handleSubtractCart,
    handleAddCart,
    clearCart,
  };
};
