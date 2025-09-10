"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import PrivateRoute from "@/hooks/private-route";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add Product", href: "/dashboard/add-product", icon: PlusSquare },
  { name: "Product List", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
];

 const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <PrivateRoute>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-md border-r fixed top-0 left-0 h-full">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Sidebar (Mobile Drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          ></div>
          {/* Drawer */}
          <div className="relative w-64 bg-white shadow-lg h-full z-50">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <SidebarContent pathname={pathname} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-sm font-medium text-gray-600">Welcome, Admin</span>
          </div>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Logout
          </button>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
    </PrivateRoute>
  );
}
export default DashboardLayout;

const SidebarContent = ({ pathname }: { pathname: string }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="px-6 py-6">
        <h1 className="text-xl font-bold">🛒 NexBuy Admin</h1>
      </div>
      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-indigo-50 hover:text-indigo-600",
                active && "bg-indigo-100 text-indigo-700"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
