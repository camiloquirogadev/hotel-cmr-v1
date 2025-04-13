import { useState, useContext } from "react";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginService(email, password);
      login(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;