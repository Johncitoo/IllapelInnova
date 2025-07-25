import { useState, useRef } from "react";
import { fetchUsuarios } from "@/api/api";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsuarioModal } from "@/components/UsuarioModal";

export const DashboardBusqueda = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [usuarioModal, setUsuarioModal] = useState<any | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBusqueda(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(async () => {
      if (value.trim()) {
        const res = await fetchUsuarios(value);
        setResultados(res);
      } else {
        setResultados([]);
      }
    }, 350);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Buscar Ficha</h2>
      <Input
        placeholder="Buscar por nombre, apellido o RUT"
        value={busqueda}
        onChange={handleChange}
        autoComplete="off"
        className="mb-4"
      />
      <div className="space-y-2">
        {resultados.map(u => (
          <Card
            key={u.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setUsuarioModal(u);
              setModalAbierto(true);
            }}
          >
            <div className="p-3 flex items-center gap-4">
              <span className="font-semibold text-base">{u.nombres} {u.apellidos}</span>
              <span className="ml-auto text-sm text-muted-foreground">{u.rut}</span>
            </div>
          </Card>
        ))}
      </div>
      <UsuarioModal
        usuario={usuarioModal}
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onActualizado={() => setModalAbierto(false)}
      />
    </div>
  );
};
