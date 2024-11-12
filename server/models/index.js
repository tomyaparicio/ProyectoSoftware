// models/index.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("estacionamiento", "root", "Aparici0", {
  host: "localhost",
  dialect: "mysql",
});

// Verificar la conexión
sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos MySQL con Sequelize"))
  .catch((err) => console.error("Error conectando a la base de datos:", err));

module.exports = sequelize;
