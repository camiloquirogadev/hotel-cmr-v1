import { useEffect, useState } from "react";
import AddReservationForm from "../components/AddReservationForm";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);

  const fetchReservations = () => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data));
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleReservationSaved = () => {
    fetchReservations();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que querés eliminar esta reserva?")) {
      await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "DELETE",
      });
      fetchReservations();
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Gestión de Reservas</h1>
      <AddReservationForm
        onReservationCreated={handleReservationSaved}
        editingReservation={editingReservation}
        setEditingReservation={setEditingReservation}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.map((r) => (
          <div
            key={r.id}
            className="bg-slate-100 dark:bg-slate-800 p-4 rounded shadow space-y-2"
          >
            <p className="text-xl font-semibold text-pink-600 dark:text-pink-400">{r.guestName}</p>
            <p>Habitación: #{r.roomNumber}</p>
            <p>Entrada: {r.checkInDate}</p>
            <p>Salida: {r.checkOutDate}</p>
            <p className={r.status === "pendiente" ? "text-red-500" : "text-green-600"}>
              Estado: {r.status}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditingReservation(r)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservations;