import { currencies } from "@/common/data";
import { ApiCurrenciesResponse } from "@/common/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCurrenciesResponse>
) {
  res.status(200).json(currencies);
}
