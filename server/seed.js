const sequelize = require('./src/utils/db');
const User = require('./src/models/User');
const Room = require('./src/models/Room');

const run = async () => {
  try {
    await sequelize.sync({ force: true });

    // Crear usuarios de prueba
    await User.create({
      name: 'Camilo Admin',
      email: 'admin@hotel.com',
      password: 'admin123', // se hashea con hook
      role: 'admin',
    });

    await User.create({
      name: 'Empleado Juan',
      email: 'juan@hotel.com',
      password: 'juan123',
      role: 'staff',
    });

    // Crear habitaciones de prueba
    await Room.bulkCreate([
      { number: '101', type: 'Single', price: 50 },
      { number: '102', type: 'Double', price: 80 },
      { number: '201', type: 'Suite Cósmica 🪐', price: 150 },
      { number: '202', type: 'Habitación Sakura 🌸', price: 130 },
    ]);

    console.log('✅ Datos de prueba cargados correctamente.');
    process.exit();
  } catch (err) {
    console.error('❌ Error al ejecutar seed:', err);
    process.exit(1);
  }
};

run();