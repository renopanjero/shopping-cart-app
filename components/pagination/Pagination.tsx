import React, { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface IPaginations {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
  setCurrentPage(page: number): void;
}

const Pagination: FC<IPaginations> = ({
  currentPage,
  nextPage,
  prevPage,
  totalPages,
  setCurrentPage,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md"
      >
        <FaArrowLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 border border-gray-300 rounded-md ${
            currentPage === page
              ? "bg-gray-300 text-gray-800"
              : "bg-gray-800 text-white hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
