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
    <nav className="bg-pink-600 text-white p-4 flex justify-between items-center shadow">
      <div className="font-bold text-xl">
        <Link to="/dashboard">Hotel CMR</Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Panel</Link>
          <Link to="/rooms" className="hover:underline">Habitaciones</Link>
          <Link to="/reservations" className="hover:underline">Reservas</Link>
        </div>
        <div className="ml-4 text-sm italic hidden sm:block">
          👋 Hola, <span className="font-semibold">{user.user?.name || "usuario"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-pink-600 font-semibold px-3 py-1 rounded hover:bg-pink-100"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
