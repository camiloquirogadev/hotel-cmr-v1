import { useState, useEffect } from "react";

function AddReservationForm({ onReservationCreated }) {
  const [form, setForm] = useState({
    guestName: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    status: 'confirmada'
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error("Error al cargar habitaciones:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        onReservationCreated(data);
        setForm({
          guestName: '',
          roomId: '',
          checkInDate: '',
          checkOutDate: '',
          status: 'confirmada'
        });
      } else {
        console.error("Error al crear reserva:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Crear reserva</h2>
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
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
      >
        Guardar reserva
      </button>
    </form>
  );
}

export default AddReservationForm;