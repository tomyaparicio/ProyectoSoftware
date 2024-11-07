<template>
  <div class="parking-container">
    <div class="header">
      <h2>Gestión de Estacionamiento</h2>
      <img :src="parkingImage" alt="Parking" class="parking-logo" />
    </div>
    <div class="legend">
      <div class="legend-item"><span class="box libre"></span> Libre</div>
      <div class="legend-item"><span class="box ocupado"></span> Ocupado</div>
    </div>

    <div class="grid">
      <button
        v-for="spot in parkingSpots"
        :key="spot.id"
        :class="['spot', { ocupado: spot.occupied }]"
        @click="selectSpot(spot)"
      >
        {{ spot.id }}
      </button>
    </div>

    <!-- Dialog Modal con Transición -->
    <transition name="dialog">
      <div v-if="selectedSpot" class="dialog-overlay">
        <div class="dialog">
          <h3>Reserva de Lugar - {{ selectedSpot.id }}</h3>
          <form @submit.prevent="reserveSpot">
            <label>Nombre y Apellido</label>
            <input
              v-model="formData.name"
              required
              placeholder="Ingrese su nombre completo"
            />

            <label>DNI</label>
            <input
              v-model="formData.dni"
              required
              placeholder="Ingrese su DNI"
            />

            <label>Patente</label>
            <input v-model="formData.plate" required placeholder="Ej: ABC123" />

            <label>Modelo del Vehículo</label>
            <input
              v-model="formData.vehicleModel"
              required
              placeholder="Ej: Toyota Corolla"
            />

            <div class="actions">
              <button type="button" @click="closeDialog">Cancelar</button>
              <button type="submit" class="reserve-btn">Reservar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import parkingImage from "../assets/parking.png";
export default {
  data() {
    return {
      parkingImage,
      parkingSpots: [
        { id: "A1", occupied: false },
        { id: "A2", occupied: false },
        { id: "A3", occupied: false },
        { id: "A4", occupied: false },
        { id: "A5", occupied: false },
        { id: "B1", occupied: false },
        { id: "B2", occupied: false },
        { id: "B3", occupied: true },
        { id: "B4", occupied: false },
        { id: "B5", occupied: false },
        { id: "C1", occupied: false },
        { id: "C2", occupied: false },
        { id: "C3", occupied: false },
        { id: "C4", occupied: false },
        { id: "C5", occupied: true },
        { id: "D1", occupied: false },
        { id: "D2", occupied: false },
        { id: "D3", occupied: true },
        { id: "D4", occupied: true },
        { id: "D5", occupied: false },
      ],
      selectedSpot: null,
      formData: {
        name: "",
        dni: "",
        plate: "",
        vehicleModel: "",
      },
    };
  },
  methods: {
    selectSpot(spot) {
      if (!spot.occupied) {
        this.selectedSpot = spot;
      }
    },
    closeDialog() {
      this.selectedSpot = null;
      this.resetForm();
    },
    reserveSpot() {
      // Marcar el lugar como ocupado
      this.selectedSpot.occupied = true;
      this.closeDialog();
    },
    resetForm() {
      this.formData = {
        name: "",
        dni: "",
        plate: "",
        vehicleModel: "",
      };
    },
  },
};
</script>

<style scoped>
.parking-container {
  text-align: center;
  font-family: "Roboto", sans-serif;
  max-width: 700px;
  margin: 0 auto;
  background-color: #f0f4f7;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

h2 {
  font-weight: bold;
  font-size: 32px;
  color: #34495e;
}

.parking-logo {
  width: 80px; /* Puedes ajustar el tamaño de la imagen según sea necesario */
  height: auto;
}

.legend {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
}

.legend-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #2c3e50;
}

.box {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 8px;
  border-radius: 4px;
}

.libre {
  background-color: #4caf50;
}

.ocupado {
  background-color: #e74c3c;
}

.grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.spot {
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  border: 2px solid #bdc3c7;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.spot.ocupado {
  background-color: #e74c3c;
  color: white;
  cursor: not-allowed;
}

.spot:hover:not(.ocupado) {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  background-color: #dfe6e9;
}

/* Estilos del diálogo */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.dialog-overlay-enter-active {
  opacity: 1;
}

.dialog-overlay-leave-active {
  opacity: 0;
}

.dialog {
  background: #ffffff;
  padding: 35px;
  padding-left: 20px;
  border-radius: 12px;
  width: 350px;
  transform: scale(0.9);
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

/* Transiciones del diálogo */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-enter,
.dialog-leave-to {
  /* Estado inicial antes de entrar y final al salir */
  opacity: 0;
  transform: scale(0.9);
}

.dialog h3 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  color: #34495e;
  text-align: center;
}

.dialog form label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
}

.dialog form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.actions button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background-color: #bdc3c7;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.actions button:hover {
  background-color: #95a5a6;
}

.reserve-btn {
  background-color: #27ae60;
  color: white;
}

.reserve-btn:hover {
  background-color: #2ecc71;
}
</style>
