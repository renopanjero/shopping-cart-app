export type CurrencyKey = "usd" | "eur" | "gbp" | "cad" | "jpy";

export type Currency = {
  key: CurrencyKey;
  symbol: string;
  usdCoef: number;
};

export type Item = {
  // key: Key | null | undefined;
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  price: number;
  priceCurrency: CurrencyKey;
  qty?: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiCurrenciesRequest = object;
export type ApiCurrenciesResponse = Currency[];

export type ApiItemsRequest = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type ApiItemsResponse = {
  total: number;
  perPage: number;
  items: Item[];
};
