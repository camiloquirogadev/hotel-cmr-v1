import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-slate-800 text-slate-100 px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-semibold tracking-wide">
        <Link to="/dashboard" className="hover:text-white transition">Hotel CMR</Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="space-x-4 text-sm font-medium">
          <Link to="/dashboard" className="hover:text-white transition">Panel</Link>
          <Link to="/rooms" className="hover:text-white transition">Habitaciones</Link>
          <Link to="/reservations" className="hover:text-white transition">Reservas</Link>
        </div>
        <div className="ml-6 italic hidden sm:block text-sm text-slate-300">
          👋 Hola, <span className="font-semibold text-slate-100">{user.user?.name || "usuario"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 px-3 py-1 bg-slate-600 hover:bg-slate-700 rounded text-sm text-white transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;