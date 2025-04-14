import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Layout from "./components/Layout";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import Guests from "./pages/Guests";

// Componente protegido
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Layout con sidebar y contenido a la derecha */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/rooms"
            element={<ProtectedRoute><Rooms /></ProtectedRoute>}
          />
          <Route
            path="/reservations"
            element={<ProtectedRoute><Reservations /></ProtectedRoute>}
          />
          <Route
            path="/guests"
            element={<ProtectedRoute><Guests /></ProtectedRoute>}
          />
        </Route>

        {/* Redirige cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
