/* eslint-disable react/prop-types */
import './modal.css';

function ModificarModal({ lugar, datos, onGuardar, onEliminar, error }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="lu">{lugar}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onGuardar}>
          <input type="text" defaultValue={datos.nombre} required />
          <input type="text" defaultValue={datos.dni} required />
          <input type="text" defaultValue={datos.patente} required />
          <input type="text" defaultValue={datos.modelo} required />
          <div className="modal-buttons">
            <button type="button" onClick={onEliminar}>Eliminar reserva</button>
            <button type="submit">Guardar modificación</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModificarModal;