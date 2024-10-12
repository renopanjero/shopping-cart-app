import React, { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface ISearchBar {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<ISearchBar> = ({ searchQuery, handleSearch }) => {
  return (
    <div className="relative flex items-center my-5 ml-1 ">
      <IoSearchOutline className="absolute text-white ml-4" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="w-96 h-10 text-white text-xl bg-gray-800 rounded-sm pl-12 border-gray-400 border"
      />
      <button className="bg-gray-300 text-gray-800 font-bold ml-4 p-2 h-full rounded-md hover:bg-white hover:text-black">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
