import { useEffect, useState } from "react";
import AddRoomForm from "../components/AddRoomForm";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener habitaciones:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés eliminar esta habitación?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRooms((prev) => prev.filter((room) => room.id !== id));
      } else {
        console.error("Error al eliminar habitación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRoomSaved = (savedRoom) => {
    if (editingRoom) {
      setRooms((prev) =>
        prev.map((r) => (r.id === savedRoom.id ? savedRoom : r))
      );
    } else {
      setRooms((prev) => [...prev, savedRoom]);
    }
    setEditingRoom(null);
  };

  if (loading) return <p className="text-center mt-6">Cargando habitaciones...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Habitaciones</h1>

      <AddRoomForm
        onRoomAdded={handleRoomSaved}
        editingRoom={editingRoom}
        setEditingRoom={setEditingRoom}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white shadow rounded p-4">
            <h3 className="text-xl font-semibold text-pink-600">Habitación #{room.number}</h3>
            <p>Tipo: {room.type}</p>
            <p>Capacidad: {room.capacity || 0} personas</p>
            <p>Precio: ${room.price}</p>
            <p className={room.status === "ocupada" ? "text-red-500" : "text-green-600"}>
              Estado: {room.status}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(room)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(room.id)}
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

export default Rooms;