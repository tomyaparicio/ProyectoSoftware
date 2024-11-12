// models/Reserva.js
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Reserva = sequelize.define(
  "Reserva",
  {
    lugar: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "reservas",
    timestamps: false,
  }
);

module.exports = Reserva;
