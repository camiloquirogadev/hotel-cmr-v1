import { useState, useEffect } from "react";

function AddRoomForm({ onRoomAdded, editingRoom, setEditingRoom }) {
  const [room, setRoom] = useState({
    number: "",
    type: "",
    capacity: "",
    price: "",
    status: "disponible",
  });

  useEffect(() => {
    if (editingRoom) setRoom(editingRoom);
  }, [editingRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingRoom ? "PUT" : "POST";
    const url = editingRoom
      ? `http://localhost:5000/api/rooms/${editingRoom.id}`
      : "http://localhost:5000/api/rooms";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });

      if (res.ok) {
        const data = await res.json();
        onRoomAdded(data);
        setRoom({ number: "", type: "", capacity: "", price: "", status: "disponible" });
        if (editingRoom) setEditingRoom(null);
      } else {
        console.error("Error al guardar habitación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 dark:bg-slate-800 p-6 rounded shadow mb-6 space-y-4">
      <h2 className="text-xl font-bold mb-2 text-slate-700 dark:text-white">
        {editingRoom ? "Editar habitación" : "Agregar nueva habitación"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="number"
          placeholder="Número"
          value={room.number}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          name="type"
          placeholder="Tipo"
          value={room.type}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacidad"
          value={room.capacity}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={room.price}
          onChange={handleChange}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <select
          name="status"
          value={room.status}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        >
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Guardar
        </button>
        {editingRoom && (
          <button
            type="button"
            onClick={() => {
              setEditingRoom(null);
              setRoom({ number: "", type: "", capacity: "", price: "", status: "disponible" });
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

export default AddRoomForm;