<template>
  <div class="instructions-background flex justify-center items-center q-py-xl">
    <div class="instructions-container flex justify-center items-center">
      <div class="flex justify-center items-center q-gutter-md">
        <div><img :src="Millonario" alt="" /></div>
        <div><h2>Instrucciones del juego</h2></div>
      </div>

      <div class="card">
        <h2>Flujo del juego</h2>
        <p>
          El juego empieza en la pantalla de inicio en nivel 1.<br />
          Cada pregunta se muestra con sus opciones y el jugador puede responder
          o usar un comodín.<br />
          Si la respuesta es correcta, sube de nivel. Si es incorrecta, termina
          el juego.<br />
          En cualquier momento, el jugador puede retirarse y quedarse con el
          dinero acumulado.
        </p>
      </div>

      <div class="card">
        <h2>Condiciones de finalización</h2>
        <p>
          🟢 Gana el juego: Responder correctamente la pregunta 15 → Premio:
          $1.000.000 <br />

          🔴 Pierde: Respuesta incorrecta → Se lleva el último nivel seguro<br />
          🟡 Se retira: Se lleva el dinero actual
        </p>
      </div>

      <div class="card">
        <h2>Dificultad por niveles</h2>
        <table>
          <thead>
            <tr>
              <th>Niveles</th>
              <th>Dificultad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nivel in niveles" :key="nivel.niveles">
              <td>{{ nivel.niveles }}</td>
              <td>{{ nivel.dificultad }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="button-container">
        <botonmillonario label="Volver al Inicio" to="/" />
      </div>
    </div>
  </div>
</template>

<script setup>
import botonmillonario from "../components/botonmillonario.vue";

const niveles = [
  { niveles: "1 – 5", dificultad: "Fácil" },
  { niveles: "6 – 10", dificultad: "Media" },
  { niveles: "11 – 15", dificultad: "Difícil" },
];

import Millonario from "../assets/Millonario.png";
</script>

<style scoped>
.instructions-background {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at center, #1a237e 0%, #000 100%);
  color: white;
}

.instructions-background::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 00%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  transform: rotate(45deg);
  animation: shine 8s linear infinite;
  pointer-events: none;
}

@keyframes shine {
  0% {
    transform: rotate(0deg) translateX(-50%) translateY(-50%);
  }
  100% {
    transform: rotate(360deg) translateX(-50%) translateY(-50%);
  }
}

.instructions-background > * {
  position: relative;
  z-index: 1;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

.instructions-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
}

.card {
  padding: 20px;
  border-radius: 10px;
}

.card h2 {
  margin-bottom: 1rem;
}

.card p {
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #666;
  padding: 10px;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

img {
  width: 150px;
  height: auto;
}
</style>