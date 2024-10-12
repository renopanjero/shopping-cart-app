import { useState } from "react";

const useQuantity = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleAdd = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id: string) => {
    setQuantities((prev) => {
      const currentQuantity = prev[id] || 0;
      if (currentQuantity > 0) {
        return {
          ...prev,
          [id]: currentQuantity - 1,
        };
      }
      return prev;
    });
  };

  const getQuantity = (id: string) => quantities[id] || 0;

  return { getQuantity, handleAdd, handleRemove };
};

export default useQuantity;
