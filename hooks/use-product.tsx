import { ApiItemsResponse } from "@/common/types";
import { fetchItems } from "@/utils/api";
import { useEffect, useState } from "react";

export const useProduct = () => {
  const [product, setProduct] = useState<ApiItemsResponse>();

  useEffect(() => {
    fetchItems().then(setProduct);
  }, []);

  return { product };
};
