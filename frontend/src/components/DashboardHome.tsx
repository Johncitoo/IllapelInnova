
import { Link } from "react-router-dom";
import { Card } from "./ui/card";

export const DashboardHome = () => (
  <div className="flex flex-col items-center justify-center gap-8">
    <h1 className="text-3xl font-bold mb-4 text-center">Bienvenido a Illapel Innova</h1>
    <p className="text-lg text-center max-w-xl mb-6 text-muted-foreground">
      Sistema de registro, búsqueda y gestión de usuarios y emprendimientos para la oficina Illapel Innova.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
      <Card>
        <div className="p-6 flex flex-col items-center">
          <span className="text-2xl mb-3">📄</span>
          <h2 className="text-lg font-semibold mb-2">Registrar nueva ficha</h2>
          <p className="text-center text-muted-foreground mb-4">Crea una ficha de usuario o emprendimiento.</p>
          <Link className="btn btn-primary w-full text-center" to="/registro">Ir a registro</Link>
        </div>
      </Card>
      <Card>
        <div className="p-6 flex flex-col items-center">
          <span className="text-2xl mb-3">🔎</span>
          <h2 className="text-lg font-semibold mb-2">Buscar ficha</h2>
          <p className="text-center text-muted-foreground mb-4">Busca, visualiza, edita o elimina fichas existentes.</p>
          <Link className="btn btn-primary w-full text-center" to="/busqueda">Ir a buscador</Link>
        </div>
      </Card>
    </div>
  </div>
);
