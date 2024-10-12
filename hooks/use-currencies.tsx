import { Currency, CurrencyKey } from "@/common/types";
import { fetchCurrency } from "@/utils/api";
import { useEffect, useState } from "react";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    {} as Currency
  );

  useEffect(() => {
    fetchCurrency().then(setCurrencies);
  }, []);

  const convertCurrencies = (
    price: number,
    fromCurrency: CurrencyKey,
    toCurrency: CurrencyKey
  ) => {
    if (!currencies.length) return price;

    const fromCurr = currencies.find((c) => c.key === fromCurrency);
    const toCurr = currencies.find((c) => c.key === toCurrency);

    if (!fromCurr || !toCurr) return price;

    return price * (toCurr.usdCoef / fromCurr.usdCoef);
  };

  return {
    currencies,
    convertCurrencies,
    selectedCurrency,
    setSelectedCurrencies: setSelectedCurrency,
  };
};
