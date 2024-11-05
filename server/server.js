const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3008;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'estacionamiento'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Obtener todos los lugares
app.get('/lugares', (req, res) => {
  db.query('SELECT * FROM reservas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const lugares = Array.from({ length: 20 }, (_, i) => {
      const lugar = `${String.fromCharCode(65 + Math.floor(i / 5))}${(i % 5) + 1}`;
      const reserva = results.find(r => r.lugar === lugar);
      return reserva ? { lugar, ...reserva, libre: false } : { lugar, libre: true };
    });
    res.json(lugares);
  });
});

// Crear una nueva reserva
app.post('/reservar', (req, res) => {
  const { lugar, nombre, dni, patente, modelo } = req.body;
  db.query(
    'INSERT INTO reservas (lugar, nombre, dni, patente, modelo) VALUES (?, ?, ?, ?, ?)',
    [lugar, nombre, dni, patente, modelo],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Reserva creada exitosamente' });
    }
  );
});

// Modificar una reserva existente
app.put('/modificar/:lugar', (req, res) => {
  const { lugar } = req.params;
  const { nombre, dni, patente, modelo } = req.body;
  db.query(
    'UPDATE reservas SET nombre = ?, dni = ?, patente = ?, modelo = ? WHERE lugar = ?',
    [nombre, dni, patente, modelo, lugar],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Reserva actualizada exitosamente' });
    }
  );
});

// Eliminar una reserva
app.delete('/eliminar/:lugar', (req, res) => {
  const { lugar } = req.params;
  db.query('DELETE FROM reservas WHERE lugar = ?', [lugar], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Reserva eliminada exitosamente' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});