import React from "react";

const ProductCard = React.memo(({ product, addToCart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300">

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>

      <p className="text-gray-600">
        <span className="font-medium">Price:</span> ₹{product.price}
      </p>

      <p className="text-gray-600">
        <span className="font-medium">Category:</span> {product.category}
      </p>

      <p className="text-gray-600 mb-4">
        <span className="font-medium">Stock:</span> {product.stock}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Add To Cart
      </button>

    </div>
  );
});

export default ProductCard;