import { useEffect, useState } from "react";
import AddReservationForm from "../components/AddReservationForm";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const fetchRooms = () => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error al obtener habitaciones:", err));
  };

  const fetchReservations = () => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener reservas:", err);
        setLoading(false);
      });
  };

  const handleCreatedOrUpdated = () => {
    setEditingReservation(null);
    fetchReservations();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta reserva?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar reserva:", err);
    }
  };

  const handleEdit = (res) => {
    const room = rooms.find((r) => r.number == res.roomNumber);
    setEditingReservation({
      ...res,
      roomId: room?.id || "",
    });
  };

  if (loading) return <p className="text-center mt-6">Cargando reservas...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Reservas</h1>

      <AddReservationForm
        onReservationCreated={handleCreatedOrUpdated}
        editingReservation={editingReservation}
        setEditingReservation={setEditingReservation}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((res) => (
          <div key={res.id} className="bg-white border border-slate-200 shadow rounded p-4">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              {res.guestName} – Habitación #{res.roomNumber}
            </h2>
            <p className="text-sm text-slate-600">Entrada: {res.checkInDate}</p>
            <p className="text-sm text-slate-600">Salida: {res.checkOutDate}</p>
            <p className="mt-2 text-sm">
              Estado:{" "}
              <span
                className={
                  res.status === "confirmada"
                    ? "text-green-600 font-semibold"
                    : "text-orange-500 font-semibold"
                }
              >
                {res.status}
              </span>
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(res)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(res.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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