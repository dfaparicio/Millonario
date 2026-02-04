<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark full-height">
    <!-- HEADER -->
    <!-- <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title>
          Quién Quiere Ser Millonario
        </q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-header> -->

    <!-- CONTENIDO -->
    <q-page-container class="bg-dark">
      <div class="text-center">
        <q-btn label="Ir al Juego" color="primary" size="lg" to="/juego" />
      </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "App",
};

import { ref } from "vue";
import { useRouter } from "vue-router";
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

.bg-dark {
  background-color: #000;
}
</style>