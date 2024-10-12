import { useState } from "react";

export const useCheckout = () => {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const showCheckout = () => setIsCheckoutVisible(true);
  const hideCheckout = () => setIsCheckoutVisible(false);

  return { isCheckoutVisible, showCheckout, hideCheckout };
};
