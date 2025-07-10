import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to place an order.");
      return navigate("/login");
    }

    try {
      const orderData = {
        customer: formData,
        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
        totalAmount: totalPrice,
      };

      const res = await axios.post("http://localhost:3000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🎉 Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("❌ Order error:", err);
      toast.error("Order failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Checkout</h2>

      <form onSubmit={handleOrder} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />

        <div className="text-xl font-semibold text-amber-500">
          Total: ₹{totalPrice}
        </div>

        <button
          type="submit"
          className="bg-amber-400 text-black px-6 py-3 rounded-xl hover:bg-amber-500 transition w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
