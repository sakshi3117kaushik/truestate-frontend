// src/pages/Dashboard.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ChevronDown,
} from "lucide-react";
import qs from "qs";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const API_ENDPOINT = `${API_BASE}/api/sales`;

function useDebounce(value, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Table + paging
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters / UI
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 450);

  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [tags, setTags] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState("date_desc");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({ units: 0, amount: 0, discount: 0 });

  const buildQuery = useCallback(() => {
    const q = { page, limit, sort };
    if (debouncedSearch) q.search = debouncedSearch;
    if (region) q.region = region;
    if (gender) q.gender = gender;
    if (productCategory) q.productCategory = productCategory;
    if (tags) q.tags = tags;
    if (paymentMethod) q.paymentMethod = paymentMethod;
    if (date) q.date = date;
    if (ageRange) {
      const [min, max] = ageRange.split("-").map((s) => s.trim());
      if (min) q.ageMin = min;
      if (max) q.ageMax = max;
    }
    return q;
  }, [
    page,
    limit,
    debouncedSearch,
    region,
    gender,
    productCategory,
    tags,
    paymentMethod,
    date,
    ageRange,
    sort,
  ]);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_ENDPOINT}?${qs.stringify(buildQuery(), {
        arrayFormat: "comma",
      })}`;
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || res.statusText);
      }
      const json = await res.json();
      setSales(json.data || []);
      setTotal(json.total ?? 0);
      setTotalPages(
        json.totalPages ?? Math.max(1, Math.ceil((json.total || 0) / limit))
      );

      const units = (json.data || []).reduce(
        (s, r) => s + (r.quantity || 0),
        0
      );
      const amount = (json.data || []).reduce(
        (s, r) => s + (r.finalAmount ?? r.totalAmount ?? 0),
        0
      );
      const discount = (json.data || []).reduce(
        (s, r) => s + (r.discountPercentage || 0),
        0
      );
      setStats({ units, amount, discount });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  }, [buildQuery, limit]);

  useEffect(() => {
    // reset page when filters change
    setPage(1);
  }, [
    debouncedSearch,
    region,
    gender,
    productCategory,
    tags,
    paymentMethod,
    date,
    ageRange,
    sort,
    limit,
  ]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales, page]);

  // handlers
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const resetFilters = () => {
    setRegion("");
    setGender("");
    setAgeRange("");
    setProductCategory("");
    setTags("");
    setPaymentMethod("");
    setDate("");
    setSort("date_desc");
    setPage(1);
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = useMemo(
    () => [
      { key: "_id", label: "Transaction ID" },
      { key: "date", label: "Date" },
      { key: "customerId", label: "Customer ID" },
      { key: "customerName", label: "Customer name" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "gender", label: "Gender" },
      { key: "age", label: "Age" },
      { key: "productCategory", label: "Product Category" },
      { key: "quantity", label: "Quantity" },
      { key: "finalAmount", label: "Total Amount" },
      { key: "customerRegion", label: "Customer Region" },
      { key: "productId", label: "Product ID" },
      { key: "employeeName", label: "Employee Name" },
      { key: "tags", label: "Tags" },
      { key: "paymentMethod", label: "Payment Method" },
    ],
    []
  );

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              M
            </div>
            <div>
              <div className="text-sm font-semibold">Vault</div>
              <div className="text-xs text-gray-500">Sales Management</div>
            </div>
          </div>
        </div>

        <nav className="px-4 py-4">
          <div className="text-xs uppercase text-gray-400 font-semibold mb-3">
            Dashboard
          </div>
          <ul className="space-y-2">
            <li className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Overview
            </li>
            <li className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Customers
            </li>
            <li className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Products
            </li>
            <li className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Reports
            </li>
          </ul>

          <div className="mt-6">
            <div className="text-xs uppercase text-gray-400 font-semibold mb-2">
              Invoices
            </div>
            <ul className="space-y-2">
              <li className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Proforma Invoices
              </li>
              <li className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Final Invoices
              </li>
            </ul>
          </div>
        </nav>

        <div className="px-6 mt-auto pb-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                Sales Management System
              </div>

              {/* Tiny filters dropdowns shown as compact chips (visual only) */}
              <div className="hidden md:flex items-center gap-2 ml-4">
                <div className="px-3 py-1 rounded-full bg-gray-100 text-xs flex items-center gap-2">
                  <span className="font-medium">M</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-gray-100 text-xs flex items-center gap-2">
                  R
                </div>
                <div className="px-3 py-1 rounded-full bg-gray-100 text-xs flex items-center gap-2">
                  4
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-[420px]">
                <input
                  className="w-full border rounded-full py-2 pl-12 pr-4 text-sm shadow-sm"
                  placeholder="Name, Phone no."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                  D
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs">
                  B
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs">
                  R
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page body */}
        <div className="max-w-8xl mx-auto px-6 py-6">
          {/* Filter controls */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex gap-2 flex-wrap">
              <select
                className="text-xs border rounded-md px-3 py-2"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Region</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>

              <select
                className="text-xs border rounded-md px-3 py-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select
                className="text-xs border rounded-md px-3 py-2"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
              >
                <option value="">Age Range</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-50">36-50</option>
                <option value="50-99">50+</option>
              </select>

              <input
                className="text-xs border rounded-md px-3 py-2 w-40"
                placeholder="Product Category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />
              <input
                className="text-xs border rounded-md px-3 py-2 w-40"
                placeholder="Tags (comma)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <input
                className="text-xs border rounded-md px-3 py-2 w-40"
                placeholder="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <div className="flex items-center border rounded-md px-2">
                <Calendar size={14} className="text-gray-500 mr-2" />
                <input
                  type="date"
                  className="text-xs py-2 pr-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <ChevronDown size={14} className="text-gray-400 ml-2" />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <select
                className="text-sm border rounded-md px-3 py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="date_desc">Sort by: Newest</option>
                <option value="date_asc">Oldest</option>
                <option value="amount_desc">Amount (desc)</option>
                <option value="quantity_desc">Quantity (desc)</option>
              </select>

              <select
                className="text-sm border rounded-md px-3 py-2"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={12}>12 / page</option>
                <option value={24}>24 / page</option>
                <option value={50}>50 / page</option>
              </select>

              <button
                onClick={resetFilters}
                className="bg-gray-100 px-3 py-2 rounded-md text-sm"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="relative -mt-2 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">
                    Total units sold (page)
                  </div>
                  <div className="text-2xl font-bold">{stats.units}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-semibold">
                  U
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">
                    Total Amount (page)
                  </div>
                  <div className="text-2xl font-bold">
                    ₹{Number(stats.amount).toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 font-semibold">
                  ₹
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">
                    Total Discount (page)
                  </div>
                  <div className="text-2xl font-bold">
                    ₹{Number(stats.discount).toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-700 font-semibold">
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading…</div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">Error: {error}</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white sticky top-0">
                  <tr>
                    {columns.map((c) => (
                      <th
                        key={c.key}
                        className="px-4 py-3 text-left font-medium text-xs text-gray-600 uppercase"
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {sales.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="p-8 text-center text-gray-500"
                      >
                        No results
                      </td>
                    </tr>
                  ) : (
                    sales.map((r) => (
                      <tr key={r._id} className="hover:bg-gray-50">
                        {columns.map((col) => {
                          let v = r[col.key];
                          if (col.key === "date")
                            v = r.date
                              ? new Date(r.date).toLocaleDateString()
                              : "-";
                          if (col.key === "finalAmount")
                            v = "₹" + (r.finalAmount ?? r.totalAmount ?? 0);
                          if (col.key === "tags")
                            v = Array.isArray(r.tags)
                              ? r.tags.join(", ")
                              : r.tags ?? "-";
                          return (
                            <td key={col.key} className="px-4 py-3 align-top">
                              <div className="text-sm text-gray-800">
                                {String(v ?? "-")}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {sales.length} of {total} results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-2 border rounded-md"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
                  const start = Math.max(1, Math.min(totalPages - 6, page - 3));
                  const p = start + i;
                  return (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`px-3 py-1 rounded-md border ${
                        p === page ? "bg-black text-white" : "bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-2 border rounded-md"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
