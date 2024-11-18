import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RiCalendarScheduleLine, RiHomeFill, RiListCheck2, RiMenu3Fill, RiMenuFill } from "react-icons/ri";
import { IoCreateSharp, IoRestaurant } from "react-icons/io5";
import { FaRegCalendarXmark } from "react-icons/fa6";

interface ListMenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
  role?: string | null;
}

interface MenuItem {
  title: string;
  items: ListMenuItem[];
}

export const dashboardMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    items: [{ name: "Dashboard", path: "/dashboard", icon: <RiHomeFill /> }],
  },
  {
    title: "Recipes",
    items: [
      { name: "Create", path: "/dashboard/recipe", icon: <IoCreateSharp />, role: "author" },
      { name: "Approved", path: "/dashboard/approved-recipes", icon: <IoRestaurant /> },
      {
        name: "Pending",
        path: "/dashboard/pending-recipes",
        icon: <RiCalendarScheduleLine />,
      },
      {
        name: "Rejected",
        path: "/dashboard/rejected-recipes",
        icon: <FaRegCalendarXmark />,
      },
    ],
  },
  {
    title: "Category",
    items: [
      {
        name: "Categories",
        path: "/dashboard/categories",
        icon: <RiListCheck2 />,
        role: "admin",
      },
    ],
  },
];

export default function SidebarDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { role } = useAuth();

  return (
    <div className="h-full relative bg-white">
      <div className="hidden sm:block w-full bg-white h-full px-8 py-6">
        <div className="flex items-center gap-x-2">
          <Link to={'/'}>
            <img src="/logo-transparent.png" alt="logo" className="size-10 lg:size-16" />
          </Link>
          <div>
            <h1 className="lg:text-xl text-sm font-semibold">Dashboard</h1>
            <p className="text-gray-600 font-medium text-[10px] lg:text-sm">Vandra Kitchen</p>
          </div>
        </div>
        <div className="mt-6">
          {dashboardMenuItems.map((section) => (
            section.items.length > 0 && (
              (section.title !== "Category" || role !== "author") && (
                <div key={section.title}>
                  <h3 className="font-semibold text-base mt-4 mb-1">{section.title}</h3>
                  {section.items.map((item) => (
                    (item.role ? item.role === role : true) && (
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
                    )
                  ))}
                </div>
              )
            )
          ))}
        </div>
      </div>

      <div className="sm:hidden">
        <div className="flex justify-between items-center px-4 py-4 bg-white border-b">
          <div className="flex items-center gap-x-2">
            <Link to={'/'}>
              <img src="/logo-transparent.png" alt="logo" className="w-10 h-10" />
            </Link>
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
          className={`fixed inset-y-0 right-0 bg-white w-4/5 z-50 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <RiMenu3Fill className="text-xl" />
            </button>
          </div>
          <div className="mt-4 px-6">
            {dashboardMenuItems.map((section) => (
              section.items.length > 0 && (
                (section.title !== "Category" || role !== "author") && (
                  <div key={section.title}>
                    <h3 className="font-semibold text-base mt-4 mb-1">{section.title}</h3>
                    {section.items.map((item) => (
                      (item.role ? item.role === role : true) && (
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
                      )
                    ))}
                  </div>
                )
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
