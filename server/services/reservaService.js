// services/reservaService.js
const reservaRepository = require("../repositories/reservaRepository");

// Obtener lista de lugares y reservas, marcando disponibilidad
const getLugares = (callback) => {
  reservaRepository.getReservas((err, results) => {
    if (err) return callback(err);

    // Genera 20 lugares con base en la lógica del nombre y disponibilidad
    const lugares = Array.from({ length: 20 }, (_, i) => {
      const lugar = `${String.fromCharCode(65 + Math.floor(i / 5))}${
        (i % 5) + 1
      }`;
      const reserva = results.find((r) => r.lugar === lugar);
      return reserva
        ? { lugar, ...reserva, libre: false }
        : { lugar, libre: true };
    });

    callback(null, lugares);
  });
};

// Crear una nueva reserva
const createReserva = (data, callback) => {
  reservaRepository.createReserva(data, callback);
};

// Modificar una reserva
const updateReserva = (lugar, data, callback) => {
  reservaRepository.updateReserva(lugar, data, callback);
};

// Eliminar una reserva
const deleteReserva = (lugar, callback) => {
  reservaRepository.deleteReserva(lugar, callback);
};

module.exports = {
  getLugares,
  createReserva,
  updateReserva,
  deleteReserva,
};
