import { useState, useEffect } from 'react';
import Lugar from './components/Lugar';
import ReservaModal from './components/ReservaModal';
import ModificarModal from './components/ModificarModal';
import './App.css';
import axios from 'axios';

function App() {
  const [lugares, setLugares] = useState([]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [datosLugar, setDatosLugar] = useState(null);
  const [mostrarModalReserva, setMostrarModalReserva] = useState(false);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar los lugares al iniciar
    axios.get('http://localhost:3008/lugares')
      .then(response => setLugares(response.data))
      .catch(error => console.error('Error al cargar los lugares:', error));
  }, []);

  const abrirModalReserva = (lugar) => {
    setLugarSeleccionado(lugar);
    setMostrarModalReserva(true);
  };

  const abrirModalModificar = (lugar, datos) => {
    setLugarSeleccionado(lugar);
    setDatosLugar(datos);
    setMostrarModalModificar(true);
  };

  const cerrarModales = () => {
    setLugarSeleccionado(null);
    setDatosLugar(null);
    setMostrarModalReserva(false);
    setMostrarModalModificar(false);
    setError('');
  };

  const validarDatos = (nombre, dni, patente, modelo) => {
    if (!nombre || !dni || !patente || !modelo) {
      return 'Todos los campos deben estar completos.';
    }
    if (nombre.length < 4) {
      return 'El nombre debe tener al menos 4 caracteres.';
    }
    if (dni.length < 6 || !/^\d+$/.test(dni)) {
      return 'El DNI debe tener al menos 6 caracteres y contener solo números.';
    }
    if (patente.length < 6) {
      return 'La patente debe tener al menos 6 caracteres.';
    }
    if (modelo.length < 5) {
      return 'El modelo del vehículo debe tener al menos 5 caracteres.';
    }
    return '';
  };

  const manejarReserva = (e) => {
    e.preventDefault();
    const nombre = e.target[0].value;
    const dni = e.target[1].value;
    const patente = e.target[2].value;
    const modelo = e.target[3].value;

    // Validar datos
    const errorMensaje = validarDatos(nombre, dni, patente, modelo);
    if (errorMensaje) {
      setError(errorMensaje);
      return;
    }

    axios.post('http://localhost:3008/reservar', {
      lugar: lugarSeleccionado,
      nombre,
      dni,
      patente,
      modelo
    }).then(() => {
      cerrarModales();
      actualizarLugares();
    }).catch(error => console.error('Error al reservar:', error));
  };

  const manejarModificacion = (e) => {
    e.preventDefault();
    const nombre = e.target[0].value;
    const dni = e.target[1].value;
    const patente = e.target[2].value;
    const modelo = e.target[3].value;

    // Validar datos
    const errorMensaje = validarDatos(nombre, dni, patente, modelo);
    if (errorMensaje) {
      setError(errorMensaje);
      return;
    }

    axios.put(`http://localhost:3008/modificar/${lugarSeleccionado}`, {
      nombre,
      dni,
      patente,
      modelo
    }).then(() => {
      cerrarModales();
      actualizarLugares();
    }).catch(error => console.error('Error al modificar la reserva:', error));
  };

  const manejarEliminacion = () => {
    axios.delete(`http://localhost:3008/eliminar/${lugarSeleccionado}`)
      .then(() => {
        cerrarModales();
        actualizarLugares();
      }).catch(error => console.error('Error al eliminar la reserva:', error));
  };

  const actualizarLugares = () => {
    axios.get('http://localhost:3008/lugares')
      .then(response => setLugares(response.data))
      .catch(error => console.error('Error al actualizar los lugares:', error));
  };

  return (
    <div className="app">
      <h1>Gestión de Estacionamiento</h1>
      <div className="leyenda">
        <div className="leyenda-item">
          <div className="cuadro libre"></div> libre
        </div>
        <div className="leyenda-item">
          <div className="cuadro ocupado"></div> ocupado
        </div>
      </div>
      <div className="estacionamiento">
        {lugares.map((lugar) => (
          <Lugar
            key={lugar.lugar}
            texto={lugar.lugar}
            ocupado={!lugar.libre}
            onClick={() => {
              if (lugar.libre) {
                abrirModalReserva(lugar.lugar);
              } else {
                abrirModalModificar(lugar.lugar, lugar);
              }
            }}
          />
        ))}
      </div>
      {mostrarModalReserva && (
        <ReservaModal
          lugar={lugarSeleccionado}
          onClose={cerrarModales}
          onReservar={manejarReserva}
          error={error}
        />
      )}
      {mostrarModalModificar && (
        <ModificarModal
          lugar={lugarSeleccionado}
          datos={datosLugar}
          onGuardar={manejarModificacion}
          onEliminar={manejarEliminacion}
          onClose={cerrarModales}
          error={error}
        />
      )}
      <img src="../public/parking.png" alt="Parking Icon" />
    </div>
  );
}

export default App;