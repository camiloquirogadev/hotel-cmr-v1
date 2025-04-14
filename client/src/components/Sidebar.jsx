// src/components/Sidebar.jsx
import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck2,
  Users,
  LogOut,
  Sun,
  Moon
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const links = [
    { to: "/dashboard", label: "Panel", icon: <LayoutDashboard size={20} /> },
    { to: "/rooms", label: "Habitaciones", icon: <BedDouble size={20} /> },
    { to: "/reservations", label: "Reservas", icon: <CalendarCheck2 size={20} /> },
    { to: "/guests", label: "Huéspedes", icon: <Users size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <aside className={`h-screen bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="h-16 flex items-center justify-between px-4 border-b dark:border-slate-700">
        <h1 className={`text-xl font-bold text-pink-600 transition-all ${collapsed ? "hidden" : "block"}`}>Hotel CMR</h1>
        <button onClick={() => setCollapsed(!collapsed)} className="text-slate-500 dark:text-slate-300">
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex flex-col gap-2 mt-4 px-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition hover:bg-pink-100 dark:hover:bg-pink-800 ${
              location.pathname === link.to
                ? "bg-pink-200 dark:bg-pink-800 text-pink-900 dark:text-white"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {link.icon}
            {!collapsed && link.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full px-4 py-3 border-t dark:border-slate-700 text-sm">
        {!collapsed && (
          <>
            <p className="mb-1 text-slate-500 dark:text-slate-300">
              👋 Hola, <span className="font-semibold">{user.user?.name}</span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-1 rounded mb-2"
            >
              Cerrar sesión
            </button>
          </>
        )}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 border px-2 py-1 rounded"
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          {!collapsed && (darkMode ? "Modo oscuro" : "Modo claro")}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
