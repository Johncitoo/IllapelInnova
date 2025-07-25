
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import { DashboardHome } from "./components/DashboardHome";
import { UsuarioForm } from "./components/UsuarioForm"
import { DashboardBusqueda } from "./components/DashboardBusqueda";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto py-8 px-2">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/registro" element={<UsuarioForm />} />
          <Route path="/busqueda" element={<DashboardBusqueda />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
