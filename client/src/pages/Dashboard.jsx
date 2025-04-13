import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import StatCard from "../components/StatCard";

const COLORS = ["#f87171", "#4ade80", "#60a5fa"];

function Dashboard() {
  const [roomsStats, setRoomsStats] = useState({ total: 0, occupied: 0, available: 0 });
  const [reservationsStats, setReservationsStats] = useState({ total: 0, confirmed: 0, pending: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        const total = data.length;
        const occupied = data.filter((r) => r.status === "ocupada").length;
        const available = total - occupied;
        setRoomsStats({ total, occupied, available });
      });

    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        const total = data.length;
        const confirmed = data.filter((r) => r.status === "confirmada").length;
        const pending = data.filter((r) => r.status === "pendiente").length;
        setReservationsStats({ total, confirmed, pending });
      });
  }, []);

  const roomPieData = [
    { name: "Ocupadas", value: roomsStats.occupied },
    { name: "Disponibles", value: roomsStats.available },
  ];

  const reservationPieData = [
    { name: "Confirmadas", value: reservationsStats.confirmed },
    { name: "Pendientes", value: reservationsStats.pending },
  ];

  return (
    <div className="p-6 min-h-screen space-y-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-black">
      <h1 className="text-3xl font-bold text-center dark:text-white">📊 Dashboard del Hotel</h1>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon="🛌" title="Disponibles" value={roomsStats.available} color="text-green-500" />
        <StatCard icon="📅" title="Reservas totales" value={reservationsStats.total} color="text-blue-500" />
        <StatCard icon="💰" title="Ingresos estimados" value={`$${reservationsStats.total * 5000}`} color="text-yellow-500" />
      </div>

      {/* Gráficos circulares */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-slate-100 dark:bg-slate-800 rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Habitaciones</h2>
          <p>Total: {roomsStats.total}</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={roomPieData} dataKey="value" outerRadius={80} label>
                {roomPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Reservas</h2>
          <p>Total: {reservationsStats.total}</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={reservationPieData} dataKey="value" outerRadius={80} label>
                {reservationPieData.map((entry, index) => (
                  <Cell key={`cell-r-${index}`} fill={COLORS[index + 1]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;