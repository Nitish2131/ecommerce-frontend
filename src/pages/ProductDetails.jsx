import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to add items to cart");
      navigate("/login");
      return;
    }

    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  if (!product) return <p className="p-6 text-blue-600">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 items-center bg-white shadow rounded-xl p-6 border border-blue-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg border"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://picsum.photos/300/300?grayscale";
          }}
        />
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-2 text-blue-700">{product.name}</h2>
          <p className="text-gray-700 mb-4 text-sm">{product.description}</p>
          <p className="text-2xl font-bold mb-4 text-amber-500">₹{product.price}</p>
          <button
            onClick={handleAddToCart}
            className="bg-amber-400 text-black px-6 py-2 rounded hover:bg-amber-500 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
