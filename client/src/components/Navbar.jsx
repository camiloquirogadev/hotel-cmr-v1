import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // si usás lucide-react o cambiamos por íconos unicode

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
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

  return (
    <nav className="bg-white dark:bg-slate-900 dark:text-white p-4 shadow">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/dashboard">Hotel CMR</Link>
        </div>

        {/* Botón hamburguesa visible solo en mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu en desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/dashboard" className="hover:underline">Panel</Link>
          <Link to="/rooms" className="hover:underline">Habitaciones</Link>
          <Link to="/reservations" className="hover:underline">Reservas</Link>

     
          <button
            onClick={toggleDarkMode}
            className="text-xl hover:scale-110 transition-transform"
            title="Cambiar tema"
          >
            {darkMode ? "🌙" : "🌞"}
          </button>
     <span className="text-sm italic">
            👋 Hola, <span className="font-semibold">{user.user?.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Menu colapsable en mobile */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-2">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Panel</Link>
          <Link to="/rooms" onClick={() => setMenuOpen(false)}>Habitaciones</Link>
          <Link to="/reservations" onClick={() => setMenuOpen(false)}>Reservas</Link>

    
          <button
            onClick={toggleDarkMode}
            className="text-xl hover:scale-110 transition-transform"
            title="Cambiar tema"
          >
            {darkMode ? "🌙" : "🌞"}
          </button> 
               <span className="text-sm italic">
            👋 Hola, <span className="font-semibold">{user.user?.name}</span>
          </span>

          <button
            onClick={handleLogout}
            className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-sm"
          >
            Cerrar sesión
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
