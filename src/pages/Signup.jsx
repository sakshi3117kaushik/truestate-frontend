import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    customerId: "",
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    gender: "",
    age: "",
    customerRegion: "",
    customerType: "New",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitSignup = async (e) => {
    e.preventDefault();

    // Simple frontend check for required fields
    const { customerId, name, email, password, phoneNo, gender, age, customerRegion } = form;
    if (!customerId || !name || !email || !password || !phoneNo || !gender || !age || !customerRegion) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post("https://truestate-backend-386l.onrender.com/api/auth/signup", form);
      alert(res.data.message || "Signup Successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={submitSignup}>
          <input
            name="customerId"
            placeholder="Customer ID"
            value={form.customerId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            name="phoneNo"
            placeholder="Phone Number"
            value={form.phoneNo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />

          {/* Gender select */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            name="customerRegion"
            placeholder="Customer Region"
            value={form.customerRegion}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
          />

          {/* Customer Type */}
          <select
            name="customerType"
            value={form.customerType}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
          >
            <option value="New">New</option>
            <option value="Returning">Returning</option>
            <option value="Loyal">Loyal</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Signup
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
