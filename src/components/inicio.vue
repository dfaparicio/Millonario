<template>
  <q-layout view="lHh Lpr lFf" class="fondo full-height">
    <q-page-container>
      <q-page class="flex flex-center full-height">
        <div class="text-center">
          <img :src="Millonario" alt="Millonario" width="300" class="q-mb-xl" />

          <div v-if="!usuarioStore.usuarioActual" class="column items-center q-gutter-md">
            <q-input filled v-model="nombreInput" label="Escribe tu nombre" dark color="amber" class="width-input"
              @keyup.enter="manejarLogin" />
            <botonmillonario label="Entrar" @click="manejarLogin" />
          </div>

          <div v-else>
            <h2 class="text-white q-mb-md">¡Bienvenido, {{ usuarioStore.usuarioActual }}!</h2>

            <div class="flex justify-center q-gutter-md">
              <botonmillonario label="Jugar" to="/juego" />
              <botonmillonario label="Instrucciones" to="/instrucciones" />

              <div class="full-width q-mt-md">
                <q-btn flat color="red-5" label="Cerrar Sesión" icon="logout" @click="usuarioStore.logout" />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import Millonario from "../assets/Millonario.png";
import botonmillonario from "../components/botonmillonario.vue";
import { useUsuarioStore } from "../usuario/usuarios.js";

const $q = useQuasar();
const usuarioStore = useUsuarioStore();
const nombreInput = ref("");

const manejarLogin = () => {
  if (!nombreInput.value.trim()) {
    $q.notify({ message: 'Escribe un nombre válido', color: 'negative', position: 'top' });
    return;
  }

  const resultado = usuarioStore.login(nombreInput.value);

  if (resultado === "existente") {
    $q.notify({
      message: `Hola de nuevo, ${usuarioStore.usuarioActual}`,
      color: 'positive',
      icon: 'person'
    });
  } else {
    $q.notify({
      message: 'Usuario registrado y conectado',
      color: 'info',
      icon: 'person_add'
    });
  }

  nombreInput.value = "";
};
</script>

<style scoped>
.full-height {
  height: 100vh;
}

.fondo {
  background: radial-gradient(circle at center, #1a237e 0%, #000 100%);
}

.width-input {
  width: 280px;
}

.text-white {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>