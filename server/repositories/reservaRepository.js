// repositories/reservaRepository.js
const db = require("../config/db");

// Obtener todos los registros de reservas
const getReservas = (callback) => {
  db.query("SELECT * FROM reservas", callback);
};

// Crear una nueva reserva en la base de datos
const createReserva = (data, callback) => {
  const { lugar, nombre, dni, patente, modelo } = data;
  db.query(
    "INSERT INTO reservas (lugar, nombre, dni, patente, modelo) VALUES (?, ?, ?, ?, ?)",
    [lugar, nombre, dni, patente, modelo],
    callback
  );
};

// Modificar una reserva existente
const updateReserva = (lugar, data, callback) => {
  const { nombre, dni, patente, modelo } = data;
  db.query(
    "UPDATE reservas SET nombre = ?, dni = ?, patente = ?, modelo = ? WHERE lugar = ?",
    [nombre, dni, patente, modelo, lugar],
    callback
  );
};

// Eliminar una reserva por su lugar
const deleteReserva = (lugar, callback) => {
  db.query("DELETE FROM reservas WHERE lugar = ?", [lugar], callback);
};

module.exports = {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
};
