import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);


        setFeaturedProducts(res.data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["men", "women", "accessories", "electronics"];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-4 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-700">
            Welcome to <span className="text-amber-500">ShopNest</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-600 mb-6">
            Discover premium products at unbeatable prices.
          </p>
          <Link to="/products">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold text-blue-700 mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/products?category=${cat}`}
              className="bg-blue-100 p-6 text-center rounded-xl hover:shadow-xl transition"
            >
              <span className="text-xl font-semibold capitalize text-blue-800 hover:underline">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-20 bg-blue-50">
        <h2 className="text-3xl font-semibold text-blue-700 mb-10 text-center">
          Featured Products
        </h2>
        {featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border border-blue-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-4"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <h3 className="text-lg font-semibold mb-1 text-blue-800">
                  {item.name}
                </h3>
                <p className="text-blue-600 text-sm mb-2">
                  {item.description}
                </p>
                <p className="text-blue-900 font-bold mb-3">₹{item.price}</p>
                <Link to={`/product/${item._id}`}>
                  <button className="bg-amber-400 text-black w-full py-2 rounded hover:bg-amber-500 text-sm transition">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Footer */}
      <section className="bg-blue-600 text-white py-16 px-4 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to experience the best deals?
        </h2>
        <p className="mb-6 text-blue-100">Join now and never miss an offer!</p>
        <Link to="/register">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
