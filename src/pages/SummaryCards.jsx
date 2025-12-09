import React from "react";

const SummaryCard = ({ title, value, extra }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border w-48">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h2 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h2>
      {extra && <p className="text-xs text-gray-400 mt-1">{extra}</p>}
    </div>
  );
};

export default SummaryCard;
