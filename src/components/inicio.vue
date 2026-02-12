<template>
  <q-layout view="lHh Lpr lFf" class="fondo full-height">
    <q-page-container>
      <q-page class="flex flex-center full-height">
        <div class="text-center">
          <img :src="Millonario" alt="Millonario" width="300" class="q-mb-xl" />

          <div v-if="!usuariostore.usuarioactual" class="column items-center q-gutter-md">
            <q-input filled v-model="nombre" label="Escribe tu nombre" dark color="amber" class="width-input"
              @keyup.enter="login" />
            <botonmillonario label="Entrar" @click="login" />
          </div>

          <div v-else>
            <h2 class="text-white q-mb-md">¡Bienvenido, {{ usuariostore.usuarioactual }}!</h2>

            <div class="flex justify-center q-gutter-md">
              <botonmillonario label="Jugar" to="/juego" />
              <botonmillonario label="Instrucciones" to="/instrucciones" />

              <div class="full-width q-mt-md">
                <q-btn flat color="red-5" label="Cerrar Sesión" icon="logout" @click="usuariostore.logout" />
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
import { usuarioStore } from "../usuario/usuarios.js";

const $q = useQuasar();
const usuariostore = usuarioStore();
const nombre = ref("");

const login = () => {
  if (!nombre.value.trim()) {
    $q.notify({ message: 'Escribe un nombre válido', color: 'negative', position: 'top' });
    return;
  }

  const resultado = usuariostore.login(nombre.value);

  if (resultado === "existente") {
    $q.notify({
      message: `Hola de nuevo, ${usuariostore.usuarioactual}`,
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

  nombre.value = "";
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