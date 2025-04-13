import DashboardStats from "../components/DashboardStats";

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">Panel de Administración</h1>
      <p className="text-center mt-4 text-gray-600">Bienvenido al sistema CMR del hotel.</p>
      <DashboardStats />
    </div>
  );
}

export default Dashboard;