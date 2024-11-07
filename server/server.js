// server.js
const app = require("./app");

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
