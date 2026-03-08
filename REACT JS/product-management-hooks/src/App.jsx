
import React from "react";
import ProductManagement from "./ProductManagement";

function App() {
  return (
    <div>
      <ProductManagement />
    </div>
  );
}

export default App;


// import React, { useState } from "react";

// const initialProducts = [
//   { id: 1, name: "Laptop", price: 50000, category: "Electronics", stock: 5 },
//   { id: 2, name: "Mobile", price: 20000, category: "Electronics", stock: 10 },
//   { id: 3, name: "Chair", price: 3000, category: "Furniture", stock: 15 },
//   { id: 4, name: "Table", price: 7000, category: "Furniture", stock: 8 }
// ];

// function App() {
//   const [products] = useState(initialProducts);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [cart, setCart] = useState([]);

//   // Filter products
//   const filteredProducts = products.filter((p) => {
//     const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
//     const matchCategory = category === "All" || p.category === category;
//     return matchSearch && matchCategory;
//   });

//   // Total inventory value
//   const totalInventoryValue = products.reduce(
//     (acc, p) => acc + p.price * p.stock,
//     0
//   );

//   // Add to cart
//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   // Total cart value
//   const totalCartValue = cart.reduce((acc, item) => acc + item.price, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-8">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">

//         <h1 className="text-4xl font-bold text-gray-800">
//           Product Store
//         </h1>

//         <div className="bg-white px-6 py-3 rounded-xl shadow-md">
//           <p className="font-semibold">
//             Cart Items: <span className="text-blue-600">{cart.length}</span>
//           </p>
//           <p className="text-sm text-gray-600">
//             Total: ₹{totalCartValue}
//           </p>
//         </div>

//       </div>

//       {/* Search + Filter */}
//       <div className="flex gap-4 mb-10">

//         <input
//           type="text"
//           placeholder="Search products..."
//           className="border p-3 rounded-lg w-60 shadow-sm focus:ring-2 focus:ring-purple-300 outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="All">All Categories</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Furniture">Furniture</option>
//         </select>

//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//         {filteredProducts.map((p) => (
//           <div
//             key={p.id}
//             className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//           >

//             <h2 className="text-xl font-semibold mb-2">
//               {p.name}
//             </h2>

//             <p className="text-gray-600 mb-2">
//               Category: {p.category}
//             </p>

//             <p className="text-lg font-bold text-green-600 mb-2">
//               ₹{p.price}
//             </p>

//             <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded mb-4">
//               Stock: {p.stock}
//             </span>

//             <button
//               onClick={() => addToCart(p)}
//               className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//             >
//               Add to Cart
//             </button>

//           </div>
//         ))}

//       </div>

//       {/* Inventory Value */}
//       <div className="mt-12 bg-white p-6 rounded-xl shadow-md w-fit">
//         <h2 className="text-xl font-semibold">
//           Total Inventory Value
//         </h2>
//         <p className="text-2xl font-bold text-green-600 mt-2">
//           ₹{totalInventoryValue}
//         </p>
//       </div>

//     </div>
//   );
// }

// export default App;