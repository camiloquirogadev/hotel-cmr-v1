import { useState, useEffect } from "react";

function AddReservationForm({ onReservationCreated, editingReservation, setEditingReservation }) {
  const [form, setForm] = useState({
    guestName: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    status: "confirmada",
  });
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error al cargar habitaciones:", err));
  }, []);

  useEffect(() => {
    if (editingReservation) {
      setForm({
        guestName: editingReservation.guestName || "",
        roomId: editingReservation.roomId || "",
        checkInDate: editingReservation.checkInDate,
        checkOutDate: editingReservation.checkOutDate,
        status: editingReservation.status || "confirmada",
      });
    }
  }, [editingReservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.checkInDate || !form.checkOutDate) {
      setError("Ambas fechas son requeridas");
      return;
    }

    if (new Date(form.checkInDate) > new Date(form.checkOutDate)) {
      setError("La fecha de entrada debe ser anterior a la de salida");
      return;
    }

    setError("");

    const url = editingReservation
      ? `http://localhost:5000/api/reservations/${editingReservation.id}`
      : "http://localhost:5000/api/reservations";

    const method = editingReservation ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onReservationCreated(data);
        setForm({
          guestName: "",
          roomId: "",
          checkInDate: "",
          checkOutDate: "",
          status: "confirmada",
        });
        setEditingReservation(null);
      } else {
        console.error("Error al guardar reserva:", data.error);
        setError("No se pudo guardar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        {editingReservation ? "Editar reserva" : "Crear reserva"}
      </h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="guestName"
          placeholder="Nombre del huésped"
          value={form.guestName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="roomId"
          value={form.roomId}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Seleccionar habitación</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              #{room.number} – {room.type}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="checkInDate"
          value={form.checkInDate}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="checkOutDate"
          value={form.checkOutDate}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="confirmada">Confirmada</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
        >
          {editingReservation ? "Guardar cambios" : "Guardar reserva"}
        </button>
        {editingReservation && (
          <button
            type="button"
            onClick={() => setEditingReservation(null)}
            className="px-4 py-2 bg-gray-300 text-slate-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default AddReservationForm;