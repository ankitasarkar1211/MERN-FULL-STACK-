// import React from "react";
// function ListRenderingExample() {
//   const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
//   return (
//     <div>
//       <h1>List Rendering Example</h1>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default ListRenderingExample;
import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (name.trim() === "" || price.trim() === "") return;

    const newProduct = {
      id: products.length + 1,
      name: name,
      price: Number(price)
    };
    //... means spread operator which is used to copy the existing array elements
    setProducts([...products, newProduct]); // Add new product to the list
    setName("");
    setPrice("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List Rendering</h2>

      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <input
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <button onClick={addProduct} style={{ padding: "8px 15px" }}>
        Add Product
      </button>

      <h3 style={{ marginTop: "20px" }}>Products:</h3>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;