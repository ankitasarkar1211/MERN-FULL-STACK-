import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import ProductCard from "./ProductCard";

const initialProducts = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics", stock: 5 },
  { id: 2, name: "Mobile", price: 20000, category: "Electronics", stock: 10 },
  { id: 3, name: "Chair", price: 3000, category: "Furniture", stock: 15 },
  { id: 4, name: "Table", price: 7000, category: "Furniture", stock: 8 },
];

function ProductManagement() {
  const [products] = useState(initialProducts);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const searchInputRef = useRef(null);
  const previousSearchRef = useRef("");
  const productListRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const handleSearch = () => {
    previousSearchRef.current = searchText;

    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  const totalInventoryValue = useMemo(() => {
    return products.reduce((total, product) => {
      return total + product.price * product.stock;
    }, 0);
  }, [products]);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setCartCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Product Management
        </h1>

        {/* Search Section */}
        <div className="flex gap-4 flex-wrap mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Product"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        {/* Stats Section */}
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold">
            Cart Count: <span className="text-blue-600">{cartCount}</span>
          </h3>

          <h3 className="text-lg font-semibold">
            Total Inventory Value: ₹{totalInventoryValue}
          </h3>
        </div>

        {/* Product List */}
        <div
          ref={productListRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProductManagement;