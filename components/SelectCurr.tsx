import { Currency } from "@/common/types";
import React, { FC } from "react";

interface ISelectCurr {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrencies: (currency: Currency) => void;
}

const SelectCurr: FC<ISelectCurr> = ({
  currencies,
  selectedCurrency,
  setSelectedCurrencies,
}) => {
  return (
    <div>
      <select
        value={selectedCurrency.key}
        onChange={(e) => {
          const currencyKey = e.target.value;
          const currency = currencies.find((c) => c.key === currencyKey);

          if (currency) {
            setSelectedCurrencies(currency);
          }
        }}
        className="w-52 bg-white text-black p-2 rounded-md "
      >
        {currencies.map((curr) => (
          <option key={curr.key} value={curr.key}>
            {curr.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCurr;
