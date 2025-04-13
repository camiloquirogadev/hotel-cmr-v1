import React, { useEffect, useState } from 'react';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener habitaciones:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Cargando habitaciones...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div key={room.id} className="bg-white rounded shadow p-4 border">
          <h2 className="text-xl font-bold text-pink-600 mb-2">Hab. {room.number}</h2>
          <p><strong>Tipo:</strong> {room.type}</p>
          <p><strong>Precio:</strong> ${room.price}</p>
          <p><strong>Estado:</strong> <span className={room.status === 'disponible' ? 'text-green-600' : 'text-red-600'}>{room.status}</span></p>
        </div>
      ))}
    </div>
  );
}

export default RoomList;