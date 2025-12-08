import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import FilterPanel from "../components/FilterPanel";
import { Sorting } from "../components/Sorting";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { transactions } from "../utils/data";

const Dashboard = () => {
  const [data, setData] = useState(transactions);
  const navigate = useNavigate();

  // search handler
  const handleSearch = (query) => {
    const filtered = transactions.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase())
    );

    setData(filtered);
  };

  // logout handler
  const handleLogout = () => {
    // Remove JWT token from localStorage (if stored)
    localStorage.removeItem("token");
    // Redirect to homepage
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>

      <Searchbar onSearch={handleSearch} />

      <FilterPanel />
      <Sorting />

      <TransactionTable data={data} />
      <Pagination />
    </div>
  );
};

export default Dashboard;
