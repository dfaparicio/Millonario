<template>
  <q-page class="game-page flex flex-center">
    <div class="top-section full-width row justify-between q-pa-md absolute-top">
      <div class="row q-gutter-md">
        <q-btn round outline color="white" icon="directions_walk" class="lifeline-btn" @click="confirmarRetirada">
          <q-tooltip>Retirarse</q-tooltip>
        </q-btn>
      </div>
      <div class="row q-gutter-md ">
        <q-btn round outline color="white" label="50:50" class="lifeline-btn text-bold" @click="use5050" :disable="comodines.cinquenta">
          <q-tooltip>Comodín 50:50</q-tooltip>
        </q-btn>
        <q-btn round outline color="white" icon="phone" class="lifeline-btn" @click="usePhone" :disable="comodines.llamada">
          <q-tooltip>Comodín de la Llamada</q-tooltip>
        </q-btn>
        <q-btn round outline color="white" icon="groups" class="lifeline-btn" @click="usePublic" :disable="comodines.publico">
          <q-tooltip>Comodín del Público</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="game-area column items-center full-width">
      <div class="logo-container q-mb-xl">
        <img src="../assets/Millonario.png" alt="Logo Millonario" class="logo-img">
      </div>

      <div class="interaction-container full-width q-px-xl">
        <div class="question-wrapper q-mb-xl">
          <div class="diamond-box question-box">
            <div class="diamond-content text-h5 text-bold text-center">
              {{ currentQuestion.pregunta }}
            </div>
          </div>
        </div>

        <div class="options-container row q-col-gutter-y-lg q-col-gutter-x-xl justify-center relative-position">
          <div v-for="(opcion, index) in currentQuestion.opciones" :key="index" class="col-12 col-md-6">
            <div 
              class="diamond-box option-box cursor-pointer" 
              :class="{ 'option-hidden': opcion.hidden }"
              @click="checkAnswer(index)"
            >
              <div class="diamond-content text-h6">
                <span class="text-orange text-bold q-mr-sm">{{ String.fromCharCode(65 + index) }}:</span>
                {{ opcion.texto }}
              </div>
            </div>
          </div>

          <div class="level-indicator absolute-center text-orange text-h6 text-bold">
            {{ nivelActual }}
          </div>
        </div>

        <div class="prize-sidebar absolute-right q-pa-md q-mr-lg gt-sm">
          <div class="prize-ladder column reverse q-gutter-xs">
            <div 
              v-for="(premio, index) in escalaPremios.slice(1)" 
              :key="index"
              class="prize-step row items-center q-px-md q-py-xs"
              :class="{ 
                'active-step': (index + 1) === nivelActual,
                'completed-step': (index + 1) < nivelActual,
                'safety-net': (index + 1) === 5 || (index + 1) === 10
              }"
            >
              <span class="step-num q-mr-md q-pr-sm" style="border-right: 1px solid rgba(255,255,255,0.2)">
                {{ index + 1 }}
              </span>
              <span class="step-value text-bold">{{ premio }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import preguntasData from '../utils/preguntas.json'

const $q = useQuasar()
const router = useRouter()

// Estado del juego
const nivelActual = ref(1)
const currentQuestion = ref({ pregunta: '', opciones: [] })
const comodines = ref({
  cinquenta: false,
  llamada: false,
  publico: false
})

const escalaPremios = [
  "$0", "$100", "$500", "$1.000", "$2.000", 
  "$5.000", "$10.000", "$20.000", "$50.000", "$100.000", "$1.000.000"
]

const confirmarRetirada = () => {
  const dineroGanado = escalaPremios[nivelActual.value - 1]
  $q.dialog({
    title: '¿QUIERES RETIRARTE?',
    message: `Si te retiras ahora te llevarás: ${dineroGanado}. ¿Estás seguro?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.dialog({
      title: 'TE HAS RETIRADO',
      message: `¡Felicidades! Te vas a casa con ${dineroGanado}.`,
      persistent: true
    }).onOk(() => {
      router.push('/')
    })
  })
}

// Función para obtener una pregunta aleatoria de un nivel dado
const obtenerPreguntaDeNivel = (nivel) => {
  const nivelData = preguntasData.find(n => n.nivel === nivel)
  if (nivelData && nivelData.preguntas.length > 0) {
    const randomIndex = Math.floor(Math.random() * nivelData.preguntas.length)
    // Clonamos el objeto para evitar modificar el JSON original directamente
    return JSON.parse(JSON.stringify(nivelData.preguntas[randomIndex]))
  }
  return null
}

watch(nivelActual, (nuevoNivel) => {
  const pregunta = obtenerPreguntaDeNivel(nuevoNivel)
  if (pregunta) {
    currentQuestion.value = pregunta
  } else if (nuevoNivel > 10) {
    $q.dialog({
      title: '¡ERES MILLONARIO!',
      message: '¡Has superado todas las preguntas!',
      persistent: true
    }).onOk(() => {
      router.push('/')
    })
  }
}, { immediate: true })

const checkAnswer = (index) => {
  const opcion = currentQuestion.value.opciones[index]
  if (opcion.correcta) {
    $q.notify({
      message: '¡CORRECTO!',
      color: 'positive',
      icon: 'check',
      position: 'top',
      timeout: 1000
    })
    
    // Si no es el nivel final, subimos de nivel. El watch se encargará de cargar la siguiente pregunta.    
    if (nivelActual.value <= 10) {
      nivelActual.value++
    }
  } else {
    // Lógica de Seguros
    let seguro = "$0"
    if (nivelActual.value > 5) seguro = "$5.000"
    
    $q.dialog({
      title: 'FIN DEL JUEGO',
      message: `Respuesta incorrecta. Te llevas el dinero del seguro: ${seguro}.`,
      persistent: true
    }).onOk(() => {
      router.push('/')
    })
  }
}

//Comodines

const use5050 = () => {
  if (comodines.value.cinquenta) return
  comodines.value.cinquenta = true
  
  const incorrectas = currentQuestion.value.opciones
    .map((opt, i) => ({ ...opt, originalIndex: i }))
    .filter(opt => !opt.correcta)
  
  const shuffle = incorrectas.sort(() => 0.5 - Math.random())
  currentQuestion.value.opciones[shuffle[0].originalIndex].hidden = true
  currentQuestion.value.opciones[shuffle[1].originalIndex].hidden = true
}

const usePhone = () => {
  if (comodines.value.llamada) return
  comodines.value.llamada = true
  
  const correcta = currentQuestion.value.opciones.find(o => o.correcta)
  $q.notify({ 
    message: `Tu amigo dice: "Creo que la respuesta correcta es la ${correcta.texto}"`, 
    color: 'info',
    icon: 'phone',
    position: 'center'
  })
}

const usePublic = () => {
  if (comodines.value.publico) return
  comodines.value.publico = true
  
  const correcta = currentQuestion.value.opciones.find(o => o.correcta)
  $q.notify({ 
    message: `El público opina que la respuesta correcta es la ${correcta.texto} con un 80% de votos.`, 
    color: 'info',
    icon: 'groups',
    position: 'center'
  })
}
</script>

<style scoped>
.game-page {
  background: radial-gradient(circle at center, #1a237e 0%, #000 100%);
  min-height: 100vh;
  color: white;
  overflow: hidden;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.lifeline-btn {
  border: 2px solid white !important;
  background: rgba(0, 0, 100, 0.4);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.lifeline-btn:hover {
  background: white;
  color: #1a237e;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
}

.logo-outer {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 4px solid #fbc02d;
  padding: 8px;
  background: #1a237e;
  box-shadow: 0 0 40px rgba(26, 35, 126, 0.8);
}

.logo-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #303f9f 0%, #1a237e 100%);
}

.logo-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-text-main {
  font-size: 1.8rem;
  font-weight: 900;
  text-shadow: 2px 2px #000;
  letter-spacing: 1px;
}

.logo-text-small {
  font-size: 0.55rem;
  letter-spacing: 5px;
  opacity: 0.7;
}

.diamond-box {
  background: linear-gradient(180deg, #1e3a8a 0%, #000033 100%);
  border-top: 2px solid #6366f1;
  border-bottom: 2px solid #6366f1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
}

.diamond-box:hover {
  background: linear-gradient(180deg, #fbc02d 0%, #f57f17 100%);
  border-color: #fff;
}

.question-box {
  width: 85%;
  margin: 0 auto;
  min-height: 80px;
}

.option-box {
  min-height: 60px;
  width: 90%;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.option-box:hover .diamond-content {
  color: rgb(0, 0, 0);
}

.text-orange {
  color: #fbc02d;
}

.option-box:hover .text-orange {
  color: white !important;
}

.option-hidden {
  opacity: 0;
  pointer-events: none;
}

.diamond-content {
  z-index: 10;
  padding: 0 10px;
}

.level-indicator {
  top: 100%;
  margin-top: 15px;
}

@media (max-width: 600px) {
  .logo-outer { width: 180px; height: 180px; }
  .logo-text-main { font-size: 1.2rem; }
  .question-box { width: 95%; font-size: 1rem; }
  .option-box { width: 100%; }
}

.prize-sidebar {
  top: 50%;
  transform: translateY(-80%) translateX(5%);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #6366f1;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.prize-step {
  color: #fbc02d;
  font-size: 0.9rem;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.active-step {
  opacity: 1;
  background: rgba(251, 192, 45, 0.2);
  border: 1px solid #fbc02d;
  color: white;
  transform: scale(1.1);
}

.completed-step {
  opacity: 1;
  color: #363535;
}

.safety-net {
  color: white !important;
  font-weight: bold;
}

.step-num {
  width: 25px;
  display: inline-block;
}
</style>
