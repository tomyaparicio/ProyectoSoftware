import Lugar from './components/Lugar';
import './App.css';

function App() {
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
        <Lugar texto="A1" ocupado={false} />
        <Lugar texto="A2" ocupado={false} />
        <Lugar texto="A3" ocupado={false} />
        <Lugar texto="A4" ocupado={false} />
        <Lugar texto="A5" ocupado={false} />
        <Lugar texto="B1" ocupado={false} />
        <Lugar texto="B2" ocupado={false} />
        <Lugar texto="B3" ocupado={true} />
        <Lugar texto="B4" ocupado={false} />
        <Lugar texto="B5" ocupado={false} />
        <Lugar texto="C1" ocupado={false} />
        <Lugar texto="C2" ocupado={false} />
        <Lugar texto="C3" ocupado={false} />
        <Lugar texto="C4" ocupado={false} />
        <Lugar texto="C5" ocupado={true} />
        <Lugar texto="D1" ocupado={false} />
        <Lugar texto="D2" ocupado={false} />
        <Lugar texto="D3" ocupado={true} />
        <Lugar texto="D4" ocupado={true} />
        <Lugar texto="D5" ocupado={false} />
      </div>
      <div className="icono-estacionamiento">
        <img src="../public/parking.png" alt="Parking Icon" />
      </div>
    </div>
  );
}

export default App;
