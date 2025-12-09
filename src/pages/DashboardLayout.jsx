import React from "react";

// Full dashboard layout in one file for quick copy-paste.
// Uses Tailwind CSS utility classes. Make sure Tailwind is configured in your project.

export default function DashboardLayout() {
  // mock data
  const summary = [
    { title: "Total units sold", value: "10" },
    { title: "Total Amount", value: "₹89,000" },
    { title: "Total Discount", value: "₹15,000", extra: "(45 Rs)" },
  ];

  const rows = Array.from({ length: 8 }).map((_, i) => ({
    id: 1234567 + i,
    date: "2023-09-26",
    customerId: "CUST12016",
    name: "Neha Yadav",
    phone: "+91 9123456789",
    gender: "Female",
    age: 25,
    category: "Clothing",
    qty: "01",
    amount: "₹1,000",
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* App shell */}
      <div className="flex">
        {/* Sidebar (fixed) */}
        <aside className="w-56 bg-gray-800 border-r border-gray-700 min-h-screen fixed">
          <div className="px-4 py-6">
            <div className="text-sm font-semibold mb-6">Vault</div>
            <nav className="space-y-2 text-sm">
              <button className="w-full text-left px-2 py-2 rounded hover:bg-gray-700 flex items-center gap-2">Dashboard</button>
              <button className="w-full text-left px-2 py-2 rounded hover:bg-gray-700 flex items-center gap-2">Intake</button>
              <button className="w-full text-left px-2 py-2 rounded hover:bg-gray-700 flex items-center gap-2">Services</button>
              <button className="w-full text-left px-2 py-2 rounded hover:bg-gray-700 flex items-center gap-2">Invoices</button>
            </nav>
          </div>
        </aside>

        {/* Main content (with left margin equal to sidebar width) */}
        <main className="flex-1 ml-56">
          {/* Top header bar */}
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <h1 className="text-4xl font-extrabold text-center text-gray-100">Sales Management System</h1>
            </div>
          </header>

          {/* Content area */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Filters row (placeholder) */}
            <div className="flex flex-wrap items-center gap-3 mb-6 justify-between">
              <div className="flex items-center gap-3">
                <input
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm placeholder-gray-400"
                  placeholder="Name, Phone no."
                />

                <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
                  <option>Region</option>
                </select>
                <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
                  <option>Gender</option>
                </select>
              </div>

              <div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded">Export</button>
              </div>
            </div>

            {/* Summary cards */}
            <section className="flex flex-wrap gap-6 mb-8 justify-start">
              {summary.map((s) => (
                <div key={s.title} className="bg-white text-gray-900 p-4 rounded-lg shadow-sm border w-56">
                  <p className="text-sm font-medium text-gray-500">{s.title}</p>
                  <h2 className="text-2xl font-semibold mt-1">{s.value}</h2>
                  {s.extra && <p className="text-xs text-gray-400 mt-1">{s.extra}</p>}
                </div>
              ))}
            </section>

            {/* Table card */}
            <section className="bg-transparent">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse table-auto">
                  <thead>
                    <tr className="text-left text-sm text-gray-200">
                      <th className="px-3 py-2 border border-gray-700">Transaction ID</th>
                      <th className="px-3 py-2 border border-gray-700">Date</th>
                      <th className="px-3 py-2 border border-gray-700">Customer ID</th>
                      <th className="px-3 py-2 border border-gray-700">Customer name</th>
                      <th className="px-3 py-2 border border-gray-700">Phone Number</th>
                      <th className="px-3 py-2 border border-gray-700">Gender</th>
                      <th className="px-3 py-2 border border-gray-700">Age</th>
                      <th className="px-3 py-2 border border-gray-700">Product Category</th>
                      <th className="px-3 py-2 border border-gray-700">Quantity</th>
                      <th className="px-3 py-2 border border-gray-700">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {rows.map((r) => (
                      <tr key={r.id} className="odd:bg-gray-800 even:bg-gray-800">
                        <td className="px-3 py-3 border border-gray-700">{r.id}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.date}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.customerId}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.name}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.phone}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.gender}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.age}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.category}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.qty}</td>
                        <td className="px-3 py-3 border border-gray-700">{r.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
