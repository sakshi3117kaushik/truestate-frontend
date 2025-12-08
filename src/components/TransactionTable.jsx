import React from "react";

const dummyData = [
  {
    id: 1,
    property: "Lakeview Apartment",
    city: "Lucknow",
    price: "₹45,00,000",
    date: "2024-10-12",
  },
  {
    id: 2,
    property: "City Center Villa",
    city: "Delhi",
    price: "₹75,00,000",
    date: "2024-09-03",
  },
];

const TransactionTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-800 text-gray-400 uppercase">
          <tr>
            <th className="p-3">Property</th>
            <th className="p-3">City</th>
            <th className="p-3">Price</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {dummyData.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-700 hover:bg-gray-800"
            >
              <td className="p-3">{row.property}</td>
              <td className="p-3">{row.city}</td>
              <td className="p-3">{row.price}</td>
              <td className="p-3">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
