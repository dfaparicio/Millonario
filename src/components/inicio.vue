<template>
  <q-layout view="lHh Lpr lFf" class="fondo full-height">
    <q-page-container class="fondo">
      <q-page class="flex flex-center full-height">
        <div class="text-center">
          <img :src="Millonario" alt="Millonario" width="300" class="q-mb-xl" />

          <div class="flex justify-center q-gutter-md">
            <botonmillonario label="Jugar" to="/juego" />
            <botonmillonario label="Instrucciones" to="/instrucciones" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Millonario from "../assets/Millonario.png";
import botonmillonario from "../components/botonmillonario.vue";
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

.full-height {
  height: 100vh;
}

.fondo {
  background: radial-gradient(
    circle at center,
    #c27aff 0%,
    #a64dff 25%,
    #7a00c0 50%,
    #52008a 75%,
    #3d0073 100%
  );
}
</style>
