import { useState } from "react";
import { RiMenu3Fill, RiMenuFill, RiHomeFill, RiRestaurantFill, RiSettings3Fill, RiListCheck2, RiSeedlingFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

export default function SidebarDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <RiHomeFill /> },
    { name: "Recipes", path: "/dashboard/recipe", icon: <RiRestaurantFill /> },
    { name: "Ingredients", path: "/dashboard/ingredients", icon: <RiSeedlingFill /> },
    { name: "Categories", path: "/dashboard/categories", icon: <RiListCheck2 /> },
    { name: "Settings", path: "/dashboard/settings", icon: <RiSettings3Fill /> },
  ];

  return (
    <div className="h-full relative bg-white">
      <div className="hidden sm:block w-full bg-white h-full px-8 py-6">
        <div className="flex items-center gap-x-2">
          <img src="/logo-transparent.png" alt="logo" className="size-10 lg:size-16" />
          <div>
            <h1 className="lg:text-xl text-sm font-semibold">Dashboard</h1>
            <p className="text-gray-600 font-medium text-[10px] lg:text-sm">Vandra Kitchen</p>
          </div>
        </div>
        <div className="mt-6">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.name}>
              <div
                className={`flex items-center gap-x-2 py-2 px-4 rounded-lg text-sm font-medium ${
                  location.pathname === item.path ||
                  (item.path === "/dashboard/recipe" && location.pathname.startsWith("/dashboard/recipe"))
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sm:hidden">
        <div className="flex justify-between items-center px-4 py-4 bg-white border-b">
          <div className="flex items-center gap-x-2">
            <img src="/logo-transparent.png" alt="logo" className="w-10 h-10" />
            <div>
              <h1 className="text-sm font-semibold">Dashboard</h1>
              <p className="text-gray-600 font-medium text-[10px]">Vandra Kitchen</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RiMenu3Fill className="text-xl" /> : <RiMenuFill className="text-xl" />}
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
        )}

        <div
          className={`fixed inset-y-0 right-0 bg-white w-3/5 z-50 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <RiMenu3Fill className="text-xl" />
            </button>
          </div>
          <div className="mt-4">
            {menuItems.map((item) => (
              <Link to={item.path} key={item.name} onClick={() => setIsOpen(false)}>
                <div
                  className={`flex items-center gap-x-2 py-2 px-4 rounded-lg text-sm font-medium ${
                    location.pathname === item.path ||
                    (item.path === "/dashboard/recipe" && location.pathname.startsWith("/dashboard/recipe"))
                      ? "bg-gray-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
