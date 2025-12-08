import { useState } from "react";
import Searchbar from "../components/Searchbar";
import FilterPanel from "../components/FilterPanel";
import Sorting from "../components/Sorting";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { transactions } from "../util/data";

const Dashboard = () => {
  const [data, setData] = useState(transactions);

  // search handler
  const handleSearch = (query) => {
    const filtered = transactions.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase())
    );

    setData(filtered);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <Searchbar onSearch={handleSearch} />

      <FilterPanel />
      <Sorting />

      <TransactionTable data={data} />
      <Pagination />
    </div>
  );
};

export default Dashboard;
