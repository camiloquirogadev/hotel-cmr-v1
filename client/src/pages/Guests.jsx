import { useEffect, useState } from "react";
import AddGuestForm from "../components/AddGuestForm";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [editingGuest, setEditingGuest] = useState(null);

  const fetchGuests = () => {
    fetch("http://localhost:5000/api/guests")
      .then((res) => res.json())
      .then(setGuests)
      .catch((err) => console.error("Error al cargar huéspedes:", err));
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este huésped?")) return;
    await fetch(`http://localhost:5000/api/guests/${id}`, { method: "DELETE" });
    fetchGuests();
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Gestión de Huéspedes</h1>
      <AddGuestForm
        onGuestSaved={fetchGuests}
        editingGuest={editingGuest}
        setEditingGuest={setEditingGuest}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {guests.map((g) => (
          <div key={g.id} className="bg-slate-100 dark:bg-slate-800 p-4 rounded shadow space-y-1">
            <h2 className="text-lg font-semibold">{g.name}</h2>
            <p>DNI: {g.dni}</p>
            <p>Email: {g.email || "-"}</p>
            <p>Teléfono: {g.phone || "-"}</p>
            <p className="italic text-sm">{g.notes || "Sin notas"}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditingGuest(g)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">Editar</button>
              <button onClick={() => handleDelete(g.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guests;
