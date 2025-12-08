import { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Send to Dashboard immediately
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
    />
  );
};

export default Searchbar;
