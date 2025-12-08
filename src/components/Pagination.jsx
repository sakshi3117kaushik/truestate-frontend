import React from "react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="px-3 py-1 rounded bg-gray-800 border border-gray-700">
        Prev
      </button>

      <button className="px-3 py-1 rounded bg-blue-600 border border-blue-500">
        1
      </button>

      <button className="px-3 py-1 rounded bg-gray-800 border border-gray-700">
        Next
      </button>
    </div>
  );
};

export default Pagination;
