import { useState, useEffect } from "react";

function AddReservationForm({ onReservationCreated, editingReservation, setEditingReservation }) {
  const [reservation, setReservation] = useState({
    guestName: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    status: "confirmada",
  });

  useEffect(() => {
    if (editingReservation) setReservation(editingReservation);
  }, [editingReservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingReservation ? "PUT" : "POST";
    const url = editingReservation
  ? `http://localhost:5000/api/reservations/${editingReservation.id}`
  : "http://localhost:5000/api/reservations";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (res.ok) {
        const data = await res.json();
        onReservationCreated(data);
        setReservation({
          guestName: "",
          roomNumber: "",
          checkInDate: "",
          checkOutDate: "",
          status: "confirmada",
        });
        setEditingReservation(null);
      } else {
        console.error("Error al guardar reserva");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 dark:bg-slate-800 p-6 rounded shadow mb-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-700 dark:text-white">
        {editingReservation ? "Editar reserva" : "Agregar nueva reserva"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="guestName"
          placeholder="Nombre del huésped"
          value={reservation.guestName}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          name="roomNumber"
          placeholder="N° de habitación"
          value={reservation.roomNumber}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="date"
          name="checkInDate"
          value={reservation.checkInDate}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="date"
          name="checkOutDate"
          value={reservation.checkOutDate}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <select
          name="status"
          value={reservation.status}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        >
          <option value="confirmada">Confirmada</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Guardar
        </button>
        {editingReservation && (
          <button
            type="button"
            onClick={() => {
              setEditingReservation(null);
              setReservation({
                guestName: "",
                roomNumber: "",
                checkInDate: "",
                checkOutDate: "",
                status: "confirmada",
              });
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default AddReservationForm;