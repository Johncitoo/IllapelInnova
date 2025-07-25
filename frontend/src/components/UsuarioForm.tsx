import React, { useState, useEffect } from "react";
import { createUsuario, updateUsuario } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const UsuarioForm = ({
  onSuccess,
  initialData,
  modoEdicion = false,
  onCancel,
  wide = false,
}: {
  onSuccess?: (data?: any) => void;
  initialData?: any;
  modoEdicion?: boolean;
  onCancel?: () => void;
  wide?: boolean;
}) => {
  const [form, setForm] = useState<any>({
    nombres: "",
    apellidos: "",
    rut: "",
    direccion: "",
    edad: "",
    fecha_nacimiento: "",
    antiguedad: "",
    contacto: "",
    redes_sociales: "",
    discapacidad: false,
    tipo_discapacidad: "",
    inscrito_registro_discapacidad: false,
    parte_programas_municipales: false,
    descripcion_negocio: "",
    otro_ingreso: false,
    sector_economico: "",
    formalizado: false,
    autorizacion_sanitaria: false,
    productos: "",
    local_establecido: false,
    direccion_local: "",
    trabaja_solo: false,
    dificultad_fisica: false,
    dificultad_psicologica: false,
    pertenece_agrupacion: false,
  });
  const [imagen, setImagen] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
      if (initialData.imagen?.url)
        setImgPreview(`http://localhost:3000${initialData.imagen.url}`);
      else setImgPreview(null);
      setPdf(null);
      setImagen(null);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImagen(file ?? null);
    if (file) setImgPreview(URL.createObjectURL(file));
  };

  const onPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdf(file ?? null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let resp;
      if (modoEdicion && initialData?.id) {
        resp = await updateUsuario(initialData.id, { ...form, imagen, pdf });
      } else {
        resp = await createUsuario({ ...form, imagen, pdf });
      }
      toast.success(
        modoEdicion ? "Ficha actualizada" : "Ficha guardada exitosamente"
      );
      onSuccess?.(resp?.data || resp);
      if (!modoEdicion) {
        setForm({
          nombres: "",
          apellidos: "",
          rut: "",
          direccion: "",
          edad: "",
          fecha_nacimiento: "",
          antiguedad: "",
          contacto: "",
          redes_sociales: "",
          discapacidad: false,
          tipo_discapacidad: "",
          inscrito_registro_discapacidad: false,
          parte_programas_municipales: false,
          descripcion_negocio: "",
          otro_ingreso: false,
          sector_economico: "",
          formalizado: false,
          autorizacion_sanitaria: false,
          productos: "",
          local_establecido: false,
          direccion_local: "",
          trabaja_solo: false,
          dificultad_fisica: false,
          dificultad_psicologica: false,
          pertenece_agrupacion: false,
        });
        setImagen(null);
        setImgPreview(null);
        setPdf(null);
      }
    } catch {
      toast.error("Error al guardar la ficha");
    }
  };

  return (
    <form
      className={`card ${wide ? "w-full max-w-5xl mx-auto" : ""}`}
      onSubmit={onSubmit}
      style={wide ? { minWidth: 700 } : undefined}
    >
      <h2 className="text-2xl font-bold mb-4">
        {modoEdicion ? "Editar Ficha" : "Registrar Ficha"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        <label>
          RUT:
          <Input name="rut" value={form.rut} onChange={handleChange} required />
        </label>
        <label>
          Dirección:
          <Input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </label>
        <label>
          Edad:
          <Input
            name="edad"
            value={form.edad}
            onChange={handleChange}
            type="number"
          />
        </label>
        <label>
          Fecha de nacimiento:
          <Input
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            type="date"
          />
        </label>
        <label>
          Antigüedad:
          <Input
            name="antiguedad"
            value={form.antiguedad}
            onChange={handleChange}
            type="number"
          />
        </label>
        <label>
          Contacto:
          <Input
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
          />
        </label>
        <label>
          Redes sociales:
          <Input
            name="redes_sociales"
            value={form.redes_sociales}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Cuenta con discapacidad?
          <Input
            name="discapacidad"
            type="checkbox"
            checked={form.discapacidad}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label>
          Tipo discapacidad:
          <Input
            name="tipo_discapacidad"
            value={form.tipo_discapacidad}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Inscrito en registro nacional discapacidad?
          <Input
            name="inscrito_registro_discapacidad"
            type="checkbox"
            checked={form.inscrito_registro_discapacidad}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Parte de programas municipales?
          <Input
            name="parte_programas_municipales"
            type="checkbox"
            checked={form.parte_programas_municipales}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label>
          Descripción del negocio:
          <Input
            name="descripcion_negocio"
            value={form.descripcion_negocio}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Cuenta con otro ingreso?
          <Input
            name="otro_ingreso"
            type="checkbox"
            checked={form.otro_ingreso}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label>
          Sector económico:
          <Input
            name="sector_economico"
            value={form.sector_economico}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Formalizado?
          <Input
            name="formalizado"
            type="checkbox"
            checked={form.formalizado}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Autorización sanitaria?
          <Input
            name="autorizacion_sanitaria"
            type="checkbox"
            checked={form.autorizacion_sanitaria}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label>
          Productos:
          <Input
            name="productos"
            value={form.productos}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Local establecido?
          <Input
            name="local_establecido"
            type="checkbox"
            checked={form.local_establecido}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label>
          Dirección local:
          <Input
            name="direccion_local"
            value={form.direccion_local}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Trabaja solo?
          <Input
            name="trabaja_solo"
            type="checkbox"
            checked={form.trabaja_solo}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label className="flex items-center gap-2">
          Dificultad física:
          <Input
            name="dificultad_fisica"
            type="checkbox"
            checked={form.dificultad_fisica}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label className="flex items-center gap-2">
          Dificultad psicológica:
          <Input
            name="dificultad_psicologica"
            type="checkbox"
            checked={form.dificultad_psicologica}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
        <label className="flex items-center gap-2">
          ¿Pertenece a agrupación?
          <Input
            name="pertenece_agrupacion"
            type="checkbox"
            checked={form.pertenece_agrupacion}
            onChange={handleChange}
            className="ml-2 w-5 h-5"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-6">
        {imgPreview && (
          <img src={imgPreview} alt="Preview" className="h-20 rounded-lg border" />
        )}
        <label>
          Imagen:
          <Input type="file" accept="image/*" onChange={onFileChange} />
        </label>
        <label>
          Adjuntar PDF:
          <Input type="file" accept="application/pdf" onChange={onPdfChange} />
        </label>
        {pdf && <div>PDF seleccionado: {pdf.name}</div>}
      </div>
      <div className="mt-8 flex gap-3">
        <Button type="submit">{modoEdicion ? "Guardar cambios" : "Guardar"}</Button>
        {modoEdicion && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
