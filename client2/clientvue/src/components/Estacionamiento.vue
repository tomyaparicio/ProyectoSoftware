<template>
  <div class="contenedor-estacionamiento">
    <div class="cabecera">
      <h2>Gestión de Estacionamiento</h2>
      <img
        :src="imagenEstacionamiento"
        alt="Parking"
        class="logo-estacionamiento"
      />
    </div>
    <div class="leyenda">
      <div class="item-leyenda"><span class="cuadro libre"></span> Libre</div>
      <div class="item-leyenda">
        <span class="cuadro ocupado"></span> Ocupado
      </div>
    </div>

    <div class="grilla">
      <button
        v-for="lugar in lugaresEstacionamiento"
        :key="lugar.lugar"
        :class="['lugar', { ocupado: !lugar.libre }]"
        @click="seleccionarLugar(lugar)"
      >
        {{ lugar.lugar }}
      </button>
    </div>

    <!-- Diálogo Modal con Transición -->
    <transition name="dialog">
      <div v-if="lugarSeleccionado" class="fondo-dialogo">
        <div class="dialogo">
          <h3>Reserva de Lugar - {{ lugarSeleccionado.lugar }}</h3>
          <form
            @submit.prevent="
              lugarSeleccionado.libre ? reservarLugar() : editarReserva()
            "
          >
            <label>Nombre y Apellido</label>
            <input
              v-model="datosFormulario.nombre"
              required
              placeholder="Ingrese su nombre completo"
            />

            <label>DNI</label>
            <input
              v-model="datosFormulario.dni"
              required
              placeholder="Ingrese su DNI"
            />

            <label>Patente</label>
            <input
              v-model="datosFormulario.patente"
              required
              placeholder="Ej: ABC123"
            />

            <label>Modelo del Vehículo</label>
            <input
              v-model="datosFormulario.modeloVehiculo"
              required
              placeholder="Ej: Toyota Corolla"
            />

            <div class="acciones">
              <button type="button" @click="cerrarDialogo">Cancelar</button>
              <button type="submit" class="boton-reservar">
                {{ lugarSeleccionado.libre ? "Reservar" : "Guardar Cambios" }}
              </button>
              <button
                v-if="!lugarSeleccionado.libre"
                type="button"
                @click="eliminarReserva"
                class="boton-eliminar"
              >
                Eliminar Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import imagenEstacionamiento from "../assets/parking.png";
import {
  getLugares,
  createReserva,
  updateReserva,
  deleteReserva,
} from "../services/reservaService";

export default {
  data() {
    return {
      imagenEstacionamiento,
      lugaresEstacionamiento: [], // Array que almacena todos los lugares de estacionamiento
      lugarSeleccionado: null, // Lugar actual seleccionado para ver detalles o editar
      datosFormulario: {
        // Datos de reserva del formulario
        nombre: "",
        dni: "",
        patente: "",
        modeloVehiculo: "",
      },
    };
  },
  created() {
    this.obtenerLugares();
  },
  methods: {
    // Método para obtener todos los lugares de estacionamiento desde el backend
    async obtenerLugares() {
      try {
        const response = await getLugares();
        this.lugaresEstacionamiento = response.data;
      } catch (error) {
        console.error(
          "Error al obtener los lugares de estacionamiento:",
          error
        );
      }
    },

    // Método que se llama al seleccionar un lugar específico
    seleccionarLugar(lugar) {
      this.lugarSeleccionado = lugar;
      if (!lugar.libre) {
        // Si el lugar está ocupado, carga la información en el formulario
        const datosSeleccionados = this.lugaresEstacionamiento.find(
          (l) => l.lugar === lugar.lugar
        );
        if (datosSeleccionados && datosSeleccionados.dataValues) {
          this.datosFormulario = {
            nombre: datosSeleccionados.dataValues.nombre || "",
            dni: datosSeleccionados.dataValues.dni || "",
            patente: datosSeleccionados.dataValues.patente || "",
            modeloVehiculo: datosSeleccionados.dataValues.modelo || "",
          };
        }
      } else {
        this.resetearFormulario();
      }
    },

    // Cierra el diálogo y resetea los datos del formulario
    cerrarDialogo() {
      this.lugarSeleccionado = null;
      this.resetearFormulario();
    },

    // Reserva un lugar enviando los datos del formulario al backend
    async reservarLugar() {
      if (this.lugarSeleccionado) {
        const datos = {
          lugar: this.lugarSeleccionado.lugar,
          nombre: this.datosFormulario.nombre,
          dni: this.datosFormulario.dni,
          patente: this.datosFormulario.patente,
          modelo: this.datosFormulario.modeloVehiculo,
        };
        try {
          await createReserva(datos);
          this.obtenerLugares(); // Actualiza la lista después de reservar
          this.cerrarDialogo();
        } catch (error) {
          console.error("Error al crear la reserva:", error);
        }
      }
    },

    // Edita una reserva existente
    async editarReserva() {
      if (this.lugarSeleccionado) {
        const datos = {
          nombre: this.datosFormulario.nombre,
          dni: this.datosFormulario.dni,
          patente: this.datosFormulario.patente,
          modelo: this.datosFormulario.modeloVehiculo,
        };
        try {
          await updateReserva(this.lugarSeleccionado.lugar, datos);
          this.obtenerLugares(); // Actualiza la lista después de editar
          this.cerrarDialogo();
        } catch (error) {
          console.error("Error al actualizar la reserva:", error);
        }
      }
    },

    // Elimina una reserva seleccionada
    async eliminarReserva() {
      if (this.lugarSeleccionado) {
        try {
          await deleteReserva(this.lugarSeleccionado.lugar);
          this.obtenerLugares(); // Actualiza la lista después de eliminar
          this.cerrarDialogo();
        } catch (error) {
          console.error("Error al eliminar la reserva:", error);
        }
      }
    },

    // Resetea el formulario a sus valores iniciales
    resetearFormulario() {
      this.datosFormulario = {
        nombre: "",
        dni: "",
        patente: "",
        modeloVehiculo: "",
      };
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.contenedor-estacionamiento {
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

/* Estilos de la cabecera */
.cabecera {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cabecera h2 {
  font-weight: bold;
  font-size: 32px;
  color: #34495e;
}

.logo-estacionamiento {
  width: 80px;
  height: auto;
}

/* Leyenda */
.leyenda {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
}

.item-leyenda {
  margin-right: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #2c3e50;
}

.cuadro {
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

/* Grilla de lugares */
.grilla {
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

.lugar {
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

.lugar.ocupado {
  background-color: #e74c3c;
  color: white;
  cursor: not-allowed;
}

.lugar:hover:not(.ocupado) {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  background-color: #dfe6e9;
}

/* Estilos del diálogo */
.fondo-dialogo {
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

.dialogo {
  background: #ffffff;
  padding: 35px;
  padding-left: 20px;
  border-radius: 12px;
  width: 350px;
  transform: scale(0.9);
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.dialogo h3 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  color: #34495e;
  text-align: center;
}

.dialogo form label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
}

.dialogo form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 14px;
}

/* Botones en el diálogo */
.acciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.acciones button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  width: 100%;
}

.acciones button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Botón de reservar */
.boton-reservar {
  background-color: #27ae60;
  color: white;
  border: 2px solid transparent;
}

.boton-reservar:hover {
  background-color: #2ecc71;
  border-color: #27ae60;
}

/* Botón de eliminar */
.boton-eliminar {
  background-color: #e74c3c;
  color: white;
  border: 2px solid transparent;
}

.boton-eliminar:hover {
  background-color: #c0392b;
  border-color: #e74c3c;
}

/* Botón de cancelar */
.acciones button[type="button"] {
  background-color: #bdc3c7;
  color: #2c3e50;
  border: 2px solid transparent;
}

.acciones button[type="button"]:hover {
  background-color: #95a5a6;
  border-color: #bdc3c7;
}
</style>
