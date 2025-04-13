function StatCard({ icon, title, value, color = "text-slate-700", bg = "bg-white" }) {
  return (
    <div className={`rounded shadow p-4 ${bg} flex items-center gap-4`}>
      <div className={`text-2xl ${color}`}>{icon}</div>
      <div>
        <h3 className="text-sm text-slate-500">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;