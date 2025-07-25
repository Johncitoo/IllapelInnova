
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="w-full flex items-center px-8 h-16 bg-background border-b border-border shadow-sm">
      <span className="text-lg font-bold tracking-wide text-primary">Illapel Innova</span>
      <div className="ml-auto flex items-center gap-6">
        <Link className={pathname==="/" ? "font-bold text-primary" : "hover:text-primary"} to="/">Inicio</Link>
        <Link className={pathname==="/registro" ? "font-bold text-primary" : "hover:text-primary"} to="/registro">Registrar ficha</Link>
        <Link className={pathname==="/busqueda" ? "font-bold text-primary" : "hover:text-primary"} to="/busqueda">Buscar ficha</Link>
      </div>
    </nav>
  );
};
