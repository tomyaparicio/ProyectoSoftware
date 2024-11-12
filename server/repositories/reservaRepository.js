// repositories/reservaRepository.js
const Reserva = require("../models/Reserva");

const getReservas = (callback) => {
  Reserva.findAll()
    .then((reservas) => callback(null, reservas))
    .catch((err) => callback(err));
};

const createReserva = (data, callback) => {
  Reserva.create(data)
    .then(() => callback(null))
    .catch((err) => callback(err));
};

const updateReserva = (lugar, data, callback) => {
  Reserva.update(data, { where: { lugar } })
    .then(() => callback(null))
    .catch((err) => callback(err));
};

const deleteReserva = (lugar, callback) => {
  Reserva.destroy({ where: { lugar } })
    .then(() => callback(null))
    .catch((err) => callback(err));
};

module.exports = {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
};
