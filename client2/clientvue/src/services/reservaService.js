// src/services/reservaService.js
import axios from "axios";

const API_URL = "http://localhost:3008";

// Obtener todos los lugares
export const getLugares = () => axios.get(`${API_URL}/lugares`);

// Crear una nueva reserva
export const createReserva = (data) => axios.post(`${API_URL}/reservar`, data);

// Modificar una reserva existente (opcional, según necesidades)
export const updateReserva = (lugar, data) =>
  axios.put(`${API_URL}/modificar/${lugar}`, data);

// Eliminar una reserva (opcional, según necesidades)
export const deleteReserva = (lugar) =>
  axios.delete(`${API_URL}/eliminar/${lugar}`);
