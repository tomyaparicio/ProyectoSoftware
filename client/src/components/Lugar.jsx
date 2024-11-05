/* eslint-disable react/prop-types */
import './lugar.css';

function Lugar({ texto, ocupado }) {
  return (
    <div className={`lugar ${ocupado ? 'ocupado' : 'libre'}`}>
      {texto}
    </div>
  );
}

export default Lugar;