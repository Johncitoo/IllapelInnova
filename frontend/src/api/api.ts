import axios from "axios";
const API_URL = "http://localhost:3000";

// Obtener lista de usuarios, con búsqueda opcional
export const fetchUsuarios = async (busqueda?: string) => {
  const res = await axios.get(`${API_URL}/usuarios`, { params: { busqueda } });
  return res.data;
};

// Crear usuario nuevo (con imagen y/o PDF si corresponde)
export const createUsuario = async (data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "boolean" || typeof value === "number") {
      formData.append(key, String(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });
  return axios.post(`${API_URL}/usuarios`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar usuario (por id)
export const updateUsuario = async (id: number, data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "boolean" || typeof value === "number") {
      formData.append(key, String(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });
  return axios.patch(`${API_URL}/usuarios/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Eliminar usuario por id
export const deleteUsuario = async (id: number) => {
  return axios.delete(`${API_URL}/usuarios/${id}`);
};
