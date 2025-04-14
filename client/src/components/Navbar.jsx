import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Home, Bed, Calendar, Users, Sun, Moon, LogOut, Menu, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const navLinkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition ${
      location.pathname === path ? "bg-slate-200 dark:bg-slate-800 font-semibold" : ""
    }`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-lg z-50 flex flex-col justify-between">
      {/* Encabezado */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-pink-600">Hotel CMR</h1>
        <button onClick={() => setCollapsed(!collapsed)} className="sm:hidden">
          {collapsed ? <Menu size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className={navLinkStyle("/dashboard")}>
          <Home size={18} /> Panel
        </Link>
        <Link to="/rooms" className={navLinkStyle("/rooms")}>
          <Bed size={18} /> Habitaciones
        </Link>
        <Link to="/reservations" className={navLinkStyle("/reservations")}>
          <Calendar size={18} /> Reservas
        </Link>
        <Link to="/guests" className={navLinkStyle("/guests")}>
          <Users size={18} /> Huéspedes
        </Link>
      </nav>

      {/* Controles inferiores */}
      <div className="border-t dark:border-slate-700 px-4 py-4 space-y-3">
        <p className="text-sm italic">👋 Hola, <strong>{user.user?.name}</strong></p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>

        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded w-full"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>
    </aside>
  );
}

export default Navbar;
