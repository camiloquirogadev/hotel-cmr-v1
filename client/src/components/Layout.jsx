import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white min-h-screen transition-all">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

