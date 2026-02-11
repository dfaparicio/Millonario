import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuario", () => {
    // El que está logueado ahora
    const usuarioActual = ref(null);
    // La lista de todos los que se han registrado
    const listaUsuarios = ref([]);

    function login(nombreEntrante) {
      const nombreLimpio = nombreEntrante.trim();
      
      // Buscamos si el nombre ya existe en nuestra lista
      const existe = listaUsuarios.value.find(u => u === nombreLimpio);

      if (existe) {
        usuarioActual.value = existe;
        return "existente";
      } else {
        // Si no existe, lo agregamos a la lista y lo logueamos
        listaUsuarios.value.push(nombreLimpio);
        usuarioActual.value = nombreLimpio;
        return "nuevo";
      }
    }

    function logout() {
      // Al cerrar sesión, solo quitamos al "actual", 
      // pero NO tocamos la listaUsuarios, así se queda en el local
      usuarioActual.value = null;
    }

    return {
      usuarioActual,
      listaUsuarios,
      login,
      logout,
    };
  },
  {
    persist: true, // Guarda tanto el actual como la lista
  }
);