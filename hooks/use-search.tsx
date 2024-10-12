import { useState } from "react";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return { searchQuery, handleSearch };
};
