// server.js
const app = require("./app");
const sequelize = require("./models");

const PORT = 3008;

// Sincronizar modelos con la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error sincronizando modelos:", err);
  });
