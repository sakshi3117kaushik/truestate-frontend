import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Search handler
  const handleSearch = (query) => {
    const filtered = []; // Replace with filtering logic when backend integrated
    setData(filtered);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h1 className="text-xl font-bold">Vault</h1>

        <nav className="space-y-3 text-gray-700">
          <p className="font-semibold uppercase text-xs">Services</p>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-black">Pre-active</li>
            <li className="cursor-pointer hover:text-black">Active</li>
            <li className="cursor-pointer hover:text-black">Blocked</li>
            <li className="cursor-pointer hover:text-black">Closed</li>
          </ul>

          <p className="font-semibold uppercase text-xs pt-4">Invoices</p>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-black">Proforma Invoices</li>
            <li className="cursor-pointer hover:text-black">Final Invoices</li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Sales Management System</h2>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search Name, Phone..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 pr-4"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {[
            "Customer Region",
            "Gender",
            "Age Range",
            "Product Category",
            "Tags",
            "Payment Method",
            "Date",
          ].map((item) => (
            <select key={item} className="border rounded-lg p-2 text-sm">
              <option>{item}</option>
            </select>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow rounded-xl text-center">
            <h3 className="font-semibold text-lg">Total units sold</h3>
            <p className="text-2xl font-bold">10</p>
          </div>

          <div className="bg-white p-4 shadow rounded-xl text-center">
            <h3 className="font-semibold text-lg">Total Amount</h3>
            <p className="text-2xl font-bold">₹89,000</p>
          </div>

          <div className="bg-white p-4 shadow rounded-xl text-center">
            <h3 className="font-semibold text-lg">Total Discount</h3>
            <p className="text-2xl font-bold">₹15,000</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-xl p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left font-semibold">
                <th className="p-2">Transaction ID</th>
                <th className="p-2">Date</th>
                <th className="p-2">Customer ID</th>
                <th className="p-2">Customer Name</th>
                <th className="p-2">Phone Number</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Age</th>
                <th className="p-2">Category</th>
                <th className="p-2">Qty</th>

                {/* NEW COLUMNS from screenshot */}
                <th className="p-2">Total Amount</th>
                <th className="p-2">Customer Region</th>
                <th className="p-2">Product ID</th>
                <th className="p-2">Employee Name</th>
              </tr>
            </thead>

            <tbody>
              {[...Array(12)].map((_, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">1234567</td>
                  <td className="p-2">2023-09-26</td>
                  <td className="p-2">CUST12016</td>
                  <td className="p-2">Neha Yadav</td>
                  <td className="p-2">+91 9123456789</td>
                  <td className="p-2">Female</td>
                  <td className="p-2">25</td>
                  <td className="p-2">Clothing</td>
                  <td className="p-2">01</td>

                  {/* NEW SCREENSHOT DATA */}
                  <td className="p-2">₹1,000</td>
                  <td className="p-2">South</td>
                  <td className="p-2">PROD0001</td>
                  <td className="p-2">Harsh Agrawal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex gap-2 justify-center mt-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              className={`px-4 py-2 rounded-lg border ${
                n === 1 ? "bg-black text-white" : "bg-white"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
