import React from "react";

const FilterPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
      <select className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
        <option>Filter by City</option>
        <option>Lucknow</option>
        <option>Delhi</option>
        <option>Mumbai</option>
      </select>

      <select className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
        <option>Filter by Property Type</option>
        <option>Apartment</option>
        <option>Villa</option>
        <option>Plot</option>
      </select>

      <select className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
        <option>Sort by</option>
        <option>Price High to Low</option>
        <option>Price Low to High</option>
        <option>Date (Newest)</option>
      </select>
    </div>
  );
};

export default FilterPanel;
