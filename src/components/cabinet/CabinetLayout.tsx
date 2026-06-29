import { NavLink, Outlet } from "react-router-dom";
import { FileText, FolderOpen, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/cabinet", label: "Обращения", icon: FileText, end: true },
  { to: "/cabinet/documents", label: "Документы", icon: FolderOpen },
  { to: "/cabinet/payments", label: "Платежи", icon: CreditCard },
];

const CabinetLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Боковое меню */}
      <aside className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <p className="text-xs text-gray-400 mb-1">Кабинет клиента</p>
          <p className="text-sm font-medium text-gray-700 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-amber-50 text-amber-800 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-500 hover:text-red-600 hover:bg-red-50 text-sm"
            onClick={signOut}
          >
            <LogOut size={16} />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CabinetLayout;
