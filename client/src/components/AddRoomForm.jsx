import { useEffect, useState } from "react";

function AddRoomForm({ onRoomAdded, editingRoom, setEditingRoom }) {
  const [form, setForm] = useState({
    number: '',
    type: '',
    capacity: '',
    price: '',
    status: 'disponible'
  });

  useEffect(() => {
    if (editingRoom) {
      setForm({
        number: editingRoom.number?.toString() || '',
        type: editingRoom.type || '',
        capacity: editingRoom.capacity?.toString() || '',
        price: editingRoom.price?.toString() || '',
        status: editingRoom.status || 'disponible'
      });
    }
  }, [editingRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los valores numéricos sean válidos
    const parsedCapacity = parseInt(form.capacity);
    const parsedPrice = parseFloat(form.price);
    const parsedNumber = parseInt(form.number);

    if (isNaN(parsedCapacity) || isNaN(parsedPrice) || isNaN(parsedNumber)) {
      alert("Por favor completá todos los campos numéricos correctamente.");
      return;
    }

    const payload = {
      number: parsedNumber,
      type: form.type,
      capacity: parsedCapacity,
      price: parsedPrice,
      status: form.status
    };

    try {
      const res = await fetch(
        editingRoom
          ? `http://localhost:5000/api/rooms/${editingRoom.id}`
          : "http://localhost:5000/api/rooms",
        {
          method: editingRoom ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (res.ok) {
        onRoomAdded(data);
        setForm({ number: '', type: '', capacity: '', price: '', status: 'disponible' });
        setEditingRoom(null);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error al guardar habitación:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        {editingRoom ? "Editar habitación" : "Agregar habitación"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="number"
          placeholder="Número"
          value={form.number}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Tipo (ej: doble, suite)"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacidad"
          value={form.capacity}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio por noche"
          value={form.price}
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
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
        </select>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
        >
          {editingRoom ? "Guardar cambios" : "Agregar"}
        </button>
        {editingRoom && (
          <button
            type="button"
            onClick={() => {
              setForm({ number: '', type: '', capacity: '', price: '', status: 'disponible' });
              setEditingRoom(null);
            }}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default AddRoomForm;