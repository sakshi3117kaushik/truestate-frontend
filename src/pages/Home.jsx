import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Retail Sales Dashboard
      </h1>

      {/* Subtitle */}
      <p className="text-gray-300 text-lg md:text-xl text-center mb-10 max-w-xl">
        Track sales, customers, revenue and optimize store performance in real-time.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link
          to="/signup"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
        >
          Login
        </Link>
      </div>

      {/* Footer Info */}
      <p className="text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} Retail Analytics Pvt. Ltd. All rights reserved.
      </p>
    </div>
  );
}
