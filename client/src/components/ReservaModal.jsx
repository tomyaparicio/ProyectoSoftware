/* eslint-disable react/prop-types */
import './modal.css';

function ReservaModal({ lugar, onClose, onReservar, error }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="lu">{lugar}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onReservar}>
          <input type="text" placeholder="Nombre y apellido" required />
          <input type="text" placeholder="DNI" required />
          <input type="text" placeholder="Patente" required />
          <input type="text" placeholder="Modelo del vehículo" required />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Volver</button>
            <button type="submit">Reservar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservaModal;