import { defineStore } from "pinia";
import { ref } from "vue";

export const usuarioStore = defineStore("usuario", () => {

    const usuarioactual = ref(null);

    const listausuarios = ref([]);

    function login(nombreactivo) {
      const nombrelimpio = nombreactivo.trim();
      
      const existe = listausuarios.value.find(u => u === nombrelimpio);

      if (existe) {
        usuarioactual.value = existe;
        return "existente";
      } else {
        listausuarios.value.push(nombrelimpio);
        usuarioactual.value = nombrelimpio;
        return "nuevo";
      }
    }

    function logout() {
      usuarioactual.value = null;
    }

    return {
      usuarioactual,
      listausuarios,
      login,
      logout,
    };
  },
  {
    persist: true, 
  }
);