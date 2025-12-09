import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  FolderOpen,
  AlertCircle,
  CheckCircle,
  FileText,
  FileEdit,
  FileCheck,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ activeItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Nexus", icon: <Users size={18} /> },
    { label: "Intake", icon: <Package size={18} /> },
    { label: "Services", icon: <ClipboardList size={18} /> },
    { label: "Pre-active", icon: <FolderOpen size={18} /> },
    { label: "Active", icon: <CheckCircle size={18} /> },
    { label: "Blocked", icon: <AlertCircle size={18} /> },
    { label: "Closed", icon: <AlertCircle size={18} /> },
    { label: "Invoices", icon: <FileText size={18} /> },
    { label: "Proforma Invoices", icon: <FileEdit size={18} /> },
    { label: "Final Invoices", icon: <FileCheck size={18} /> },
  ];

  return (
    <div className="h-screen flex">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 p-2 rounded-md bg-gray-200 hover:bg-gray-300 lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
  className={`bg-gray-900 text-gray-200 h-full transition-all duration-300 ease-in-out
    ${isOpen ? "w-64" : "w-16"} block fixed`}
>

        <div className="flex flex-col py-6 px-2 gap-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all
                ${activeItem === item.label ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              <span>{item.icon}</span>

              {/* Hide text when collapsed */}
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
