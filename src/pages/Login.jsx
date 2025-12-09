import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://truestate-backend-386l.onrender.com/api/auth/login",
        form
      );
      alert("Login Successful");
      navigate("/dashboard");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={submitLogin}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">Signup</a>
        </p>
      </div>
    </div>
  );
}
