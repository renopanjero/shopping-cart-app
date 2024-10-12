import { items } from "@/common/data";
import { ApiItemsRequest, ApiItemsResponse } from "@/common/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiItemsResponse>
) {
  const params = req.query as unknown as ApiItemsRequest;
  const limit = +(params.limit ?? 10);
  const offset = +(params.offset ?? 0);
  const query = params.query;

  const filtered = items.filter((item) =>
    query
      ? item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      : true
  );

  const sliced = filtered.slice(offset, limit + offset);

  res.status(200).json({
    total: filtered.length,
    perPage: limit,
    items: sliced,
  });
}
