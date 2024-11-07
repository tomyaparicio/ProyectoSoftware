// app.js
const express = require("express");
const cors = require("cors");
const reservaController = require("./controllers/reservaController");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get("/lugares", reservaController.getLugares);
app.post("/reservar", reservaController.createReserva);
app.put("/modificar/:lugar", reservaController.updateReserva);
app.delete("/eliminar/:lugar", reservaController.deleteReserva);

module.exports = app;
