// controllers/reservaController.js
const reservaService = require("../services/reservaService");

// Controlador para obtener todos los lugares
const getLugares = (req, res) => {
  reservaService.getLugares((err, lugares) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(lugares);
  });
};

// Controlador para crear una nueva reserva
const createReserva = (req, res) => {
  reservaService.createReserva(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Reserva creada exitosamente" });
  });
};

// Controlador para modificar una reserva existente
const updateReserva = (req, res) => {
  const { lugar } = req.params;
  reservaService.updateReserva(lugar, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Reserva actualizada exitosamente" });
  });
};

// Controlador para eliminar una reserva
const deleteReserva = (req, res) => {
  const { lugar } = req.params;
  reservaService.deleteReserva(lugar, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Reserva eliminada exitosamente" });
  });
};

module.exports = {
  getLugares,
  createReserva,
  updateReserva,
  deleteReserva,
};
