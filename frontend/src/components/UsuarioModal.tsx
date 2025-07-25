import React, { useState } from "react";
import { UsuarioForm } from "./UsuarioForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteUsuario } from "@/api/api";

interface Props {
  usuario: any;
  open: boolean;
  onClose: () => void;
  onActualizado?: (nuevoUsuario: any | null) => void;
}

export const UsuarioModal: React.FC<Props> = ({ usuario, open, onClose, onActualizado }) => {
  const [editando, setEditando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  if (!open || !usuario) return null;

  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta ficha? Esta acción es irreversible.")) return;
    setEliminando(true);
    await deleteUsuario(usuario.id);
    toast.success("Ficha eliminada");
    setEliminando(false);
    onClose();
    onActualizado?.(null);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background rounded-2xl shadow-2xl p-8 w-full max-w-5xl relative border border-border">
        <button
          className="absolute right-6 top-6 text-3xl text-purple-400 hover:text-purple-300 transition"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✖
        </button>
        {!editando ? (
          <>
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold mb-1">Registro de usuario</h2>
              <div className="text-lg font-medium text-primary mb-2">{usuario.nombres} {usuario.apellidos}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 flex-wrap">
              <div className="flex-1 min-w-[220px] space-y-2">
                <FichaCampo label="RUT" value={usuario.rut} />
                <FichaCampo label="Dirección" value={usuario.direccion} />
                <FichaCampo label="Edad" value={usuario.edad} />
                <FichaCampo label="Fecha de nacimiento" value={usuario.fecha_nacimiento} />
                <FichaCampo label="Antigüedad" value={usuario.antiguedad} />
                <FichaCampo label="Contacto" value={usuario.contacto} />
                <FichaCampo label="Redes sociales" value={usuario.redes_sociales} />
                <FichaCampo label="¿Discapacidad?" value={usuario.discapacidad ? "Sí" : "No"} />
                <FichaCampo label="Tipo discapacidad" value={usuario.tipo_discapacidad} />
                <FichaCampo label="¿Inscrito en registro nacional discapacidad?" value={usuario.inscrito_registro_discapacidad ? "Sí" : "No"} />
                <FichaCampo label="¿Parte de programas municipales?" value={usuario.parte_programas_municipales ? "Sí" : "No"} />
                <FichaCampo label="Descripción del negocio" value={usuario.descripcion_negocio} />
                <FichaCampo label="¿Cuenta con otro ingreso?" value={usuario.otro_ingreso ? "Sí" : "No"} />
                <FichaCampo label="Sector económico" value={usuario.sector_economico} />
                <FichaCampo label="¿Formalizado?" value={usuario.formalizado ? "Sí" : "No"} />
                <FichaCampo label="¿Autorización sanitaria?" value={usuario.autorizacion_sanitaria ? "Sí" : "No"} />
                <FichaCampo label="Productos" value={usuario.productos} />
                <FichaCampo label="¿Local establecido?" value={usuario.local_establecido ? "Sí" : "No"} />
                <FichaCampo label="Dirección local" value={usuario.direccion_local} />
                <FichaCampo label="¿Trabaja solo?" value={usuario.trabaja_solo ? "Sí" : "No"} />
                <FichaCampo label="Dificultad física" value={usuario.dificultad_fisica ? "Sí" : "No"} />
                <FichaCampo label="Dificultad psicológica" value={usuario.dificultad_psicologica ? "Sí" : "No"} />
                <FichaCampo label="¿Pertenece a agrupación?" value={usuario.pertenece_agrupacion ? "Sí" : "No"} />
              </div>
              <div className="flex flex-col items-center min-w-[220px] mt-4 md:mt-0">
                <div className="w-44 h-44 rounded-lg border border-border flex items-center justify-center bg-muted mb-2">
                  {usuario.imagen?.url ? (
                    <img
                      src={`http://localhost:3000${usuario.imagen.url}`}
                      alt="Foto usuario"
                      className="rounded-lg w-44 h-44 object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Sin foto</span>
                  )}
                </div>
                {usuario.pdfUrl && (
                  <a
                    href={`http://localhost:3000${usuario.pdfUrl}`}
                    className="text-primary underline mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar PDF adjunto
                  </a>
                )}
                <div className="flex gap-4 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setEditando(true)}>
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleEliminar}
                    disabled={eliminando}
                  >
                    {eliminando ? "Eliminando..." : "Eliminar"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <UsuarioForm
            modoEdicion
            initialData={usuario}
            onSuccess={nuevo => {
              setEditando(false);
              onActualizado?.(nuevo);
            }}
            onCancel={() => setEditando(false)}
          />
        )}
      </div>
    </div>
  );
};

const FichaCampo = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <div className="mb-1">
    <span className="font-semibold">{label}:</span>
    <span className="ml-2 text-sm">{value ?? <span className="text-gray-400">-</span>}</span>
  </div>
);
