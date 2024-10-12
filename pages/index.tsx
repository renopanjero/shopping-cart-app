import { Item } from "@/common/types";
import { Navbar } from "@/components/navbar/Navbar";
import { ProductCard } from "@/components/product/ProductCard";
import { useProduct } from "@/hooks/use-product";
import { useCart } from "@/hooks/use-cart";
import Cart from "@/components/cart/Cart";
import { PiShoppingCartFill } from "react-icons/pi";
import { useCurrencies } from "@/hooks/use-currencies";

import SelectCurr from "@/components/SelectCurr";
import useQuantity from "@/hooks/use-quantity";
import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/components/pagination/Pagination";
import { useSearch } from "@/hooks/use-search";
import SearchBar from "@/components/search/SearchBar";
import { useEffect } from "react";
import { useCheckout } from "@/hooks/use-checkout";
import Checkout from "@/components/checkout/Checkout";

export default function Home() {
  const { product } = useProduct();
  const {
    currencies,
    selectedCurrency,
    setSelectedCurrencies,
    convertCurrencies,
  } = useCurrencies();

  const {
    carts,
    addCart,
    handleSubtractCart,
    handleAddCart,
    removeCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  const { getQuantity, handleAdd, handleRemove } = useQuantity();

  const { searchQuery, handleSearch } = useSearch();
  const { isCheckoutVisible, showCheckout, hideCheckout } = useCheckout();

  const filteredItems =
    product?.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const itemsPerPage = 3;
  const {
    currentPage,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
    totalPages,
    setCurrentPage,
  } = usePagination(filteredItems.length || 0, itemsPerPage);

  const paginatedItems = filteredItems.slice(startIndex, endIndex) || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  const totalPrice = getTotalPrice(selectedCurrency);

  return (
    <>
      <Navbar />

      <div className="container mx-auto grid grid-cols-12 gap-4 overflow-hidden">
        <div className="gap-4 col-span-8 py-4">
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

          <div className=" grid grid-cols-3 gap-4 mt-5">
            {paginatedItems.map((item: Item) => {
              const quantity = getQuantity(item.id);

              const convertedPrice = convertCurrencies(
                item.price,
                "usd",
                selectedCurrency.key
              );
              const cart = carts.find((c) => c.id === item.id);

              return (
                <ProductCard
                  key={item.id}
                  item={{ ...item, price: convertedPrice }}
                  addCart={addCart}
                  selectedCurrency={selectedCurrency}
                  cart={cart}
                  handleSubtractCart={handleSubtractCart}
                  handleAddCart={handleAddCart}
                  convertCurrencies={convertCurrencies}
                  // todo: ....
                  quantity={quantity}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              );
            })}
          </div>

          <div className="m-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <div className="col-span-4 bg-gray-800 rounded-md flex flex-col justify-between mb-4 mt-9">
          <div className="flex m-4 gap-2">
            <PiShoppingCartFill className="h-8 w-8" />
            <h2 className="font-bold text-2xl">Cart</h2>
          </div>

          <div
            className={`flex-grow flex flex-col ${
              carts.length === 0 ? "justify-center items-center" : ""
            }`}
          >
            {carts.length === 0 ? (
              <p className="font-bold text-3xl text-center ">Cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {carts.map((item: Item) => (
                  <Cart
                    key={item.id}
                    item={item}
                    removeCart={removeCart}
                    selectedCurrency={selectedCurrency}
                    convertCurrencies={convertCurrencies}
                    currencies={currencies}
                    handleAddCart={handleAddCart}
                    handleSubtractCart={handleSubtractCart}
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="text-right mx-8 my-5 space-y-2">
            <h1 className="text-gray-380 text-3xl">Total</h1>
            <h2 className="font-bold text-white text-4xl">
              {totalPrice.symbol}
              {totalPrice.total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-between bg-gray-800 rounded-md container mx-auto h-auto mb-4 items-center">
        <div className=" m-5 space-y-3">
          <h1 className="text-3xl ">Currency</h1>
          <SelectCurr
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrencies={setSelectedCurrencies}
          />
        </div>
        <button
          className="bg-gray-300 text-gray-800 p-3 px-6 text-2xl font-bold rounded-sm mx-8 hover:bg-white"
          onClick={showCheckout}
        >
          Checkout
        </button>
      </div>
      {isCheckoutVisible && (
        <Checkout
          carts={carts}
          totalPrice={totalPrice}
          selectedCurrency={selectedCurrency}
          hideCheckout={hideCheckout}
          clearCart={clearCart}
        />
      )}
    </>
  );
}
