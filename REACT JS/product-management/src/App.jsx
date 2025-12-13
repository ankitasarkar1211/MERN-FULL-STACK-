import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  //for adding a new product
  const addProduct = () => {
    if (name.trim() === "" || price.trim() === "") return;

    if (editingId) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, name, price: parseFloat(price) } : p
        )
      );
      setEditingId(null);
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
      };
      setProducts([...products, newProduct]);
    }

    setName("");
    setPrice("");
  };

  //for deleting a product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  //for editing a product
  const editProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setName(productToEdit.name);
    setPrice(productToEdit.price.toString());
    setEditingId(id);
  };

  return (
    <div
      style={{
        margin: "0",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fccacaff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Product Management System</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          padding: "50px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f8f8d3ff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Enter the name of the product"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "200px",
            borderRadius: "4px",
            border: "1px solid #656565ff",
          }}
        />
        <input
          type="number"
          placeholder="Enter the price of the product"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "200px",
            borderRadius: "4px",
            border: "1px solid #656565ff",
          }}
        />
        <button
          onClick={addProduct}
          style={{
            padding: "6px 15px",
            cursor: "pointer",
            backgroundColor: "#fccacaff",
            border: "1px solid #656565ff",
            borderRadius: "4px",
          }}
        >
          {editingId!==null ? "Update Product" : "Add Product"}
        </button>

        <h3 style={{ marginBottom: "0px" }}>Product List</h3>
        <ul style={{ marginTop: "0px" }}>
          {products.map((p) => (
            <li key={p.id} style={{ marginBottom: "10px" }}>
              {p.name} - ${p.price.toFixed(2)}
              <button
                onClick={() => deleteProduct(p.id)}
                style={{
                  marginLeft: "10px",
                  padding: "4px 10px",
                  backgroundColor: "#9b1313ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => editProduct(p.id)}
                style={{
                  marginLeft: "10px",
                  padding: "4px 10px",
                  backgroundColor: "#0d7b2aff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
