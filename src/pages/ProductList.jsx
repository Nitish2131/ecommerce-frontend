import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        let allProducts = res.data;

        if (category) {
          allProducts = allProducts.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
          );
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        {category
          ? `${category[0].toUpperCase() + category.slice(1)} Products`
          : "All Products"}
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-blue-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-blue-100 p-4 rounded-xl shadow hover:shadow-md transition bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />

              <h3 className="text-lg font-semibold text-blue-800">
                {product.name}
              </h3>
              <p className="text-blue-600 mb-2 text-sm">{product.description}</p>
              <p className="text-blue-900 font-bold mb-3">₹{product.price}</p>

              <Link to={`/product/${product._id}`}>
                <button className="w-full py-2 bg-amber-400 text-black rounded hover:bg-amber-500 transition text-sm">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
