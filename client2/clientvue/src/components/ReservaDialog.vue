<template>
  <div class="dialog-overlay">
    <div class="dialog">
      <h3>{{ spot.id }}</h3>
      <form @submit.prevent="submitForm">
        <label>Nombre y apellido</label>
        <input v-model="formData.name" required />

        <label>DNI</label>
        <input v-model="formData.dni" required />

        <label>Patente</label>
        <input v-model="formData.plate" required />

        <label>Modelo del vehículo</label>
        <input v-model="formData.vehicleModel" required />

        <div class="actions">
          <button type="button" @click="$emit('close')">Volver</button>
          <button type="submit">Reservar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    spot: Object,
  },
  data() {
    return {
      formData: {
        spotId: this.spot ? this.spot.id : "",
        name: "",
        dni: "",
        plate: "",
        vehicleModel: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("reserve", { ...this.formData });
    },
  },
  watch: {
    spot(newSpot) {
      if (newSpot) {
        this.formData.spotId = newSpot.id;
      }
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
