/* eslint-disable react/prop-types */
import './lugar.css';

function Lugar({ texto, ocupado, onClick }) {
  return (
    <div className={`lugar ${ocupado ? 'ocupado' : 'libre'}`} onClick={onClick}>
      {texto}
    </div>
  );
}

export default Lugar;