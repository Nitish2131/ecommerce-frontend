import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-white hover:text-amber-300 transition"
        >
          Aimerz
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-amber-300 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-amber-300 transition">
            Products
          </Link>

          {token ? (
            <>
              <Link
                to="/cart"
                className="relative hover:text-amber-300 transition"
              >
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 bg-white text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber-300 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-amber-300 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
