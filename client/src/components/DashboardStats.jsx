import { useEffect, useState } from "react";

function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar métricas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-6">Cargando estadísticas...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-bold text-pink-600">🛏️ Total de habitaciones</h3>
        <p className="text-2xl mt-2">{stats.totalRooms}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-bold text-red-600">🟥 Ocupadas</h3>
        <p className="text-2xl mt-2">{stats.occupiedRooms}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-bold text-green-600">🟩 Disponibles</h3>
        <p className="text-2xl mt-2">{stats.availableRooms}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-bold text-blue-600">📅 Reservas totales</h3>
        <p className="text-2xl mt-2">{stats.totalReservations}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-bold text-yellow-600">💰 Ingresos simulados</h3>
        <p className="text-2xl mt-2">$ {stats.totalRevenue}</p>
      </div>
    </div>
  );
}

export default DashboardStats;