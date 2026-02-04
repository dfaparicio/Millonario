<template>
  <q-btn
    :label="label"
    color="transparent"
    class="millionaire-btn"
    @click="$emit('click')"
    unelevated
    rounded
    size="lg"
    :to="to"
  />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  to: { type: String, default: null },
});
</script>

<style scoped>
.millionaire-btn {
  background: linear-gradient(180deg, #ffd700, #b8860b);
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
  border: 3px solid #fff8dc;
  width: 250px;
  height: 60px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.millionaire-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #ffd700;
  cursor: pointer;
}

.millionaire-btn:active {
  transform: scale(0.95);
}
</style>
