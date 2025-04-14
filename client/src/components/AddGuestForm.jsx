import { useEffect, useState } from "react";

function AddGuestForm({ onGuestSaved, editingGuest, setEditingGuest }) {
  const [form, setForm] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (editingGuest) setForm(editingGuest);
  }, [editingGuest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingGuest ? "PUT" : "POST";
    const url = editingGuest
      ? `http://localhost:5000/api/guests/${editingGuest.id}`
      : "http://localhost:5000/api/guests";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onGuestSaved();
    setForm({ name: "", dni: "", email: "", phone: "", notes: "" });
    setEditingGuest(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 dark:bg-slate-800 p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-semibold">{editingGuest ? "Editar huésped" : "Nuevo huésped"}</h2>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required className="w-full p-2 rounded bg-white dark:bg-slate-700" />
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} required className="w-full p-2 rounded bg-white dark:bg-slate-700" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 rounded bg-white dark:bg-slate-700" />
      <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="w-full p-2 rounded bg-white dark:bg-slate-700" />
      <textarea name="notes" placeholder="Notas" value={form.notes} onChange={handleChange} rows={2} className="w-full p-2 rounded bg-white dark:bg-slate-700" />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          {editingGuest ? "Actualizar" : "Guardar"}
        </button>
        {editingGuest && (
          <button type="button" onClick={() => setEditingGuest(null)} className="text-sm text-gray-500 hover:underline">Cancelar</button>
        )}
      </div>
    </form>
  );
}

export default AddGuestForm;
