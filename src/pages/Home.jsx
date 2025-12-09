import { Link } from "react-router-dom";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Title */}
      <h1 className="home-title">
        Retail Sales Dashboard
      </h1>

      {/* Subtitle */}
      <p className="home-subtitle">
        Track sales, customers, revenue and optimize store performance in
        real-time.
      </p>

      {/* Buttons */}
      <div className="home-buttons">
        <Link to="/signup" className="btn btn-blue">
          Signup
        </Link>

        <Link to="/login" className="btn btn-green">
          Login
        </Link>
      </div>

      {/* Footer Info */}
      <p className="home-footer">
        © {new Date().getFullYear()} Retail Analytics Pvt. Ltd. All rights
        reserved.
      </p>
    </div>
  );
}
