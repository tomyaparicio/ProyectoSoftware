<template>
  <div class="parking-container">
    <h2>Gestión de Estacionamiento</h2>
    <div class="legend">
      <div class="legend-item"><span class="box libre"></span> libre</div>
      <div class="legend-item"><span class="box ocupado"></span> ocupado</div>
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
          <h3>{{ selectedSpot.id }}</h3>
          <form @submit.prevent="reserveSpot">
            <label>Nombre y apellido</label>
            <input v-model="formData.name" required />

            <label>DNI</label>
            <input v-model="formData.dni" required />

            <label>Patente</label>
            <input v-model="formData.plate" required />

            <label>Modelo del vehículo</label>
            <input v-model="formData.vehicleModel" required />

            <div class="actions">
              <button type="button" @click="closeDialog">Volver</button>
              <button type="submit">Reservar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
``
<style scoped>
.parking-container {
  text-align: center;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 24px;
}

.legend {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20%;
}

.legend-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.box {
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-right: 5px;
}

.libre {
  background-color: lightgray;
}

.ocupado {
  background-color: #ff6666;
}

.grid {
  margin-top: 10%;
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-gap: 20px;
  justify-content: center;
  grid-gap: 40px; /* Espacio entre los lugares */
  justify-content: center;
  min-height: 50vh; /* Centrar verticalmente en toda la altura de la pantalla */
}

.spot {
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  font-size: 1em;
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 5px;
}

.spot.ocupado {
  background-color: #ff6666;
  cursor: not-allowed;
  color: white;
}

.spot:hover:not(.ocupado) {
  transform: scale(1.05);
}

/* Estilos del diálogo */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  transform: scale(0.9);
  transition: transform 0.3s ease, opacity 0.3s ease;
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
  transform: scale(0.8);
}

.dialog h3 {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.dialog form label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.dialog form input {
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.actions button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  cursor: pointer;
  font-size: 14px;
}

.actions button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

.actions button:hover {
  opacity: 0.85;
}
</style>
