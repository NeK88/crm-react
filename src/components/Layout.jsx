import { Outlet, Link, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="px-5 py-10 bg-blue-900 md:w-1/4">
        <h2 className="text-4xl font-black text-center text-white">
          CRM Clientes
        </h2>
        <nav className="mt-10">
          <Link
            className={`${
              location.pathname === "/" ? "text-blue-300" : "text-white"
            } block mt-2 text-2xl hover:text-blue-300`}
            to="/"
          >
            Clientes
          </Link>
          <Link
            className={`${
              location.pathname === "/clientes/nuevo"
                ? "text-blue-300"
                : "text-white"
            } block mt-2 text-2xl hover:text-blue-300`}
            to="/clientes/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </aside>
      <main className="p-10 overflow-scroll md:w-3/4 md:h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
