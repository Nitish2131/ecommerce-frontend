import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", form);
      alert("Registered successfully! Now login.");
      console.log(res.data);
    } catch (err) {
        console.error("Full error object:", err);
        console.error("err.response:", err.response);
      
        const errorMsg =
          err.response?.data?.error ||
          err.response?.data?.message || // Just in case
          err.message ||
          "Unknown error";
      
        alert("Registration failed: " + errorMsg);
      }
      
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
