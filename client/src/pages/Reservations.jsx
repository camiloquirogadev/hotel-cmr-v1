import { useEffect, useState } from "react";
import AddReservationForm from "../components/AddReservationForm";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

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

  const handleCreated = (newReservation) => {
    fetchReservations(); // o setReservations([...reservations, newReservation]);
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

  if (loading) return <p className="text-center mt-6">Cargando reservas...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Reservas</h1>

      <AddReservationForm onReservationCreated={handleCreated} />

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
            <button
              onClick={() => handleDelete(res.id)}
              className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservations;