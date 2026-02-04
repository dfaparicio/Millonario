<template>
  <q-page class="game-page flex flex-center">
    <div class="top-section full-width row justify-between q-pa-md absolute-top">
      <div class="row q-gutter-md">
        <q-btn round outline color="white" icon="euro_symbol" class="lifeline-btn">
          <q-tooltip>Dinero Acumulado</q-tooltip>
        </q-btn>
        <q-btn round outline color="white" icon="directions_walk" class="lifeline-btn">
          <q-tooltip>Retirarse</q-tooltip>
        </q-btn>
      </div>
      <div class="row q-gutter-md">
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

    <!-- Main Game Area -->
    <div class="game-area column items-center full-width">
      <!-- Central Logo -->
      <div class="logo-container q-mb-xl">
        <div class="logo-outer">
          <div class="logo-inner">
            <div class="logo-circle">
              <div class="logo-text-small top">QUIEN QUIERE SER</div>
              <div class="logo-text-main">MILLONARIO</div>
              <div class="logo-text-small bottom">QUIEN QUIERE SER</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interaction Area (Question and Options) -->
      <div class="interaction-container full-width q-px-xl">
        <!-- Question Block -->
        <div class="question-wrapper q-mb-xl">
          <div class="diamond-box question-box">
            <div class="diamond-content text-h5 text-bold text-center">
              {{ currentQuestion.pregunta }}
            </div>
          </div>
        </div>

        <!-- Options Grid -->
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

          <!-- Level indicator -->
          <div class="level-indicator absolute-center text-orange text-h6 text-bold">
            {{ nivelActual }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Estado del juego
const nivelActual = ref(1)
const comodines = ref({
  cinquenta: false,
  llamada: false,
  publico: false
})

// Pregunta de ejemplo (basada en la imagen)
const currentQuestion = ref({
  pregunta: '¿Qué tipo de animal es una libélula?',
  opciones: [
    { texto: 'Mamífero', correcta: false, hidden: false },
    { texto: 'Insecto', correcta: true, hidden: false },
    { texto: 'Reptil', correcta: false, hidden: false },
    { texto: 'Ave', correcta: false, hidden: false }
  ]
})

const checkAnswer = (index) => {
  const opcion = currentQuestion.value.opciones[index]
  if (opcion.correcta) {
    $q.notify({
      message: '¡CORRECTO!',
      color: 'positive',
      icon: 'check',
      position: 'top'
    })
    // Aquí iría la lógica para pasar a la siguiente pregunta
  } else {
    $q.notify({
      message: 'Respuesta incorrecta. Fin del juego.',
      color: 'negative',
      icon: 'close',
      position: 'top'
    })
  }
}

// Comodines
const use5050 = () => {
  if (comodines.value.cinquenta) return
  comodines.value.cinquenta = true
  
  const incorrectas = currentQuestion.value.opciones
    .map((opt, i) => ({ ...opt, originalIndex: i }))
    .filter(opt => !opt.correcta)
  
  // Ocultar dos al azar
  const shuffle = incorrectas.sort(() => 0.5 - Math.random())
  currentQuestion.value.opciones[shuffle[0].originalIndex].hidden = true
  currentQuestion.value.opciones[shuffle[1].originalIndex].hidden = true
}

const usePhone = () => {
  comodines.value.llamada = true
  $q.notify({ message: 'Tu amigo cree que la respuesta es Insecto', color: 'info' })
}

const usePublic = () => {
  comodines.value.publico = true
  $q.notify({ message: 'El público votó: B: 85%, A: 5%, C: 5%, D: 5%', color: 'info' })
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

/* Comodines Style */
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

/* Logo "Millonario" CSS */
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

/* Diamond boxes for Question/Answers */
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
}

.diamond-box::before,
.diamond-box::after {
  content: '';
  position: absolute;
  top: -2px;
  width: 40px;
  height: calc(100% + 4px);
  background: inherit;
  border-top: 2px solid #6366f1;
  border-bottom: 2px solid #6366f1;
}

.diamond-box::before {
  left: -20px;
  transform: skewX(-30deg);
  border-left: 2px solid #6366f1;
}

.diamond-box::after {
  right: -20px;
  transform: skewX(30deg);
  border-right: 2px solid #6366f1;
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

.option-box:hover {
  background: linear-gradient(180deg, #fbc02d 0%, #f57f17 100%);
  border-color: #fff;
}

.option-box:hover .diamond-content {
  color: black;
}

.option-box:hover .text-orange {
  color: white;
}

.option-hidden {
  opacity: 0;
  pointer-events: none;
}

.diamond-content {
  z-index: 10;
  padding: 0 10px;
}

.text-orange {
  color: #fbc02d;
}

.level-indicator {
  top: 100%;
  margin-top: 15px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .logo-outer { width: 180px; height: 180px; }
  .logo-text-main { font-size: 1.2rem; }
  .question-box { width: 95%; font-size: 1rem; }
  .option-box { width: 100%; }
}
</style>
