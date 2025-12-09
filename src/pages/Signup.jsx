import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

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

    const { customerId, name, email, password, phoneNo, gender, age, customerRegion } = form;
    if (!customerId || !name || !email || !password || !phoneNo || !gender || !age || !customerRegion) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://truestate-backend-386l.onrender.com/api/auth/signup",
        form
      );
      alert(res.data.message || "Signup Successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <form className="signup-form" onSubmit={submitSignup}>
          <input name="customerId" placeholder="Customer ID" value={form.customerId} onChange={handleChange} required className="input-field"/>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="input-field"/>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input-field"/>
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input-field"/>
          <input name="phoneNo" placeholder="Phone Number" value={form.phoneNo} onChange={handleChange} required className="input-field"/>

          <select name="gender" value={form.gender} onChange={handleChange} required className="input-field">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required className="input-field"/>
          <input name="customerRegion" placeholder="Customer Region" value={form.customerRegion} onChange={handleChange} required className="input-field"/>

          <select name="customerType" value={form.customerType} onChange={handleChange} className="input-field">
            <option value="New">New</option>
            <option value="Returning">Returning</option>
            <option value="Loyal">Loyal</option>
          </select>

          <button type="submit" className="btn-submit">Signup</button>
        </form>

        <p className="signup-footer">
          Already have an account? <a href="/login" className="login-link">Login</a>
        </p>
      </div>
    </div>
  );
}
