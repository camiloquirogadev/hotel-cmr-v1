# 🏨 hotel-cmr-v1

**Sistema CMR completo para la gestión de un hotel.**  
Aplicación full stack moderna desarrollada con **React, Node.js, PostgreSQL y Docker**, pensada para escalar como una solución SaaS modular y eficiente.

---

## 🚀 Tecnologías principales

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL + Sequelize ORM
- **Autenticación**: JWT
- **Contenedores**: Docker + Docker Compose

---

## 📦 Estructura del proyecto

```
hotel-cmr-v1/
├── client/               # Frontend con React
├── server/               # Backend con Express
├── db-data/              # Volumen persistente de PostgreSQL
├── docker-compose.yml    # Configuración de servicios
├── .gitignore
└── README.md
```

---

## ✨ Funcionalidades (MVP)

- Gestión de habitaciones y reservas
- Registro de huéspedes
- Check-in / Check-out digital
- Autenticación de usuarios (admin / staff)
- Dashboard con métricas clave
- Facturación e historial de clientes

---

## 📖 Uso local

### 1. Clonar el repositorio

```bash
git clone https://github.com/camiloquirogadev/hotel-cmr-v1.git
cd hotel-cmr-v1
```

### 2. Configurar variables de entorno

Crear archivos `.env` en `/server` y `/client` con las variables necesarias.  
Ejemplo básico para el backend:

```env
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=hotel_cmr
DB_HOST=db
JWT_SECRET=supersecretkey
```

### 3. Levantar el entorno con Docker

```bash
docker-compose up --build
```

- El frontend se sirve en: [http://localhost:5173](http://localhost:5173)  
- El backend en: [http://localhost:5000/api](http://localhost:5000/api)  
- PostgreSQL corre en el puerto `5432`

---

## 🧠 Futuras mejoras (Roadmap)

- Gestión de empleados y tareas
- Integración con pasarelas de pago (MercadoPago, Stripe)
- Notificaciones automáticas (email/SMS/WhatsApp)
- Panel multi-hotel y soporte SaaS
- App móvil y auto check-in con QR

---

## 🤝 Contribuciones

Este proyecto está en fase activa de desarrollo. Si querés colaborar, ¡bienvenid@!  
Podés abrir un issue, enviar un pull request o sugerir mejoras desde GitHub.

---

## 🧑‍💻 Autor

**Camilo Sol Quiroga** – [@camiloquirogadev](https://github.com/camiloquirogadev)  
Desarrollador web & fundador de sistemas de automatización y soluciones digitales.

---

## 🪪 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---