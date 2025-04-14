// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
