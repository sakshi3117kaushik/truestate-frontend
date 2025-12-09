// src/pages/Dashboard.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ChevronDown,
  Menu,
} from "lucide-react";
import qs from "qs";
import "./Dashboard.css";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://truestate-backend-386l.onrender.com";
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

  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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
      if (!res.ok) throw new Error(await res.text());

      const json = await res.json();
      setSales(json.data || []);
      setTotal(json.total ?? 0);
      setTotalPages(
        json.totalPages ?? Math.max(1, Math.ceil((json.total || 0) / limit))
      );

      const units = (json.data || []).reduce((s, r) => s + (r.quantity || 0), 0);
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
      setError(err.message || "Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  }, [buildQuery, limit]);

  useEffect(() => {
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
      { key: "customerName", label: "Customer Name" },
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
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            M
          </div>
          <div>
            <p className="text-lg font-bold">Vault</p>
            <p className="text-xs text-gray-500">Sales Dashboard</p>
          </div>
        </div>

        <nav className="p-4 flex-1">
          <p className="text-xs text-gray-500 uppercase mb-3">Menu</p>
          <ul className="sidebar-menu">
            {["Overview", "Customers", "Products", "Reports"].map((x) => (
              <li key={x} className="sidebar-item">
                {x}
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-500 uppercase mt-6 mb-3">Invoices</p>
          <ul className="sidebar-menu">
            <li className="sidebar-item">Proforma Invoices</li>
            <li className="sidebar-item">Final Invoices</li>
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <h1>Sales Management</h1>
          <div className="flex items-center gap-3">
            <div className="search-container">
              <input
                className="search-input"
                placeholder="Search by name or phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
            <Menu />
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="filters-box">
            <select className="filter-input" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Region</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>

            <select className="filter-input" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select className="filter-input" value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
              <option value="">Age Range</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-50">36-50</option>
              <option value="50-99">50+</option>
            </select>

            <input
              className="filter-input"
              placeholder="Category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />

            <input
              className="filter-input"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <input
              className="filter-input"
              placeholder="Payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <div className="filter-input flex items-center">
              <Calendar size={14} />
              <input
                type="date"
                className="text-xs py-2 pr-2 bg-transparent"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <ChevronDown size={14} />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <select className="filter-input" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="date_desc">Newest</option>
                <option value="date_asc">Oldest</option>
                <option value="amount_desc">Amount (High → Low)</option>
                <option value="quantity_desc">Quantity (High → Low)</option>
              </select>

              <select
                className="filter-input"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>

              <button onClick={resetFilters} className="reset-btn">
                Reset
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <Card title="Units Sold" value={stats.units} color="blue" icon="U" />
            <Card title="Total Amount" value={`₹${stats.amount.toLocaleString()}`} color="green" icon="₹" />
            <Card title="Total Discount" value={`₹${stats.discount.toLocaleString()}`} color="yellow" icon="%" />
          </div>

          {/* Table */}
          <div className="sales-table-container">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="p-12 text-center text-red-600">{error}</div>
            ) : (
              <table className="sales-table">
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th key={c.key} className="table-heading">
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sales.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="table-cell text-center">
                        No results found
                      </td>
                    </tr>
                  ) : (
                    sales.map((r) => (
                      <tr key={r._id}>
                        {columns.map((col) => {
                          let v = r[col.key];
                          if (col.key === "date")
                            v = r.date ? new Date(r.date).toLocaleDateString() : "-";
                          if (col.key === "finalAmount")
                            v = "₹" + (r.finalAmount ?? r.totalAmount ?? 0);
                          if (col.key === "tags")
                            v = Array.isArray(r.tags) ? r.tags.join(", ") : r.tags ?? "-";

                          return (
                            <td key={col.key} className="table-cell">
                              {String(v ?? "-")}
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
          <div className="pagination-container">
            <p>
              Showing {sales.length} of {total} results
            </p>

            <div className="flex gap-2">
              <button onClick={() => goToPage(page - 1)} disabled={page <= 1} className="page-btn">
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
                const start = Math.max(1, Math.min(totalPages - 6, page - 3));
                const p = start + i;
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`page-btn ${p === page ? "active" : ""}`}
                  >
                    {p}
                  </button>
                );
              })}

              <button onClick={() => goToPage(page + 1)} disabled={page >= totalPages} className="page-btn">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Small Card Component */
function Card({ title, value, color, icon }) {
  const bg = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
  }[color];

  return (
    <div className="stat-card">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>

      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${bg}`}>
        {icon}
      </div>
    </div>
  );
}
