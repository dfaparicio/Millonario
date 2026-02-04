<template>
  <q-btn
    :label="label"
    class="millionaire-btn"
    unelevated
    :to="to"
    no-caps
  />
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  to: { type: String, default: null },
});
</script>

<style scoped>
.millionaire-btn {
  background: linear-gradient(180deg, #1e3a8a 0%, #000033 100%);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 2px solid #6366f1;
  border-bottom: 2px solid #6366f1;
  border-left: 2px solid #6366f1;
  border-right: 2px solid #6366f1;
  width: 280px;
  height: 60px;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.millionaire-btn:hover {
  background: linear-gradient(180deg, #fbc02d 0%, #f57f17 100%);
  border-color: #fff;
  color: black;
  transform: scale(1.02);
  box-shadow: 0 0 25px rgba(251, 192, 45, 0.4);
}

.millionaire-btn:active {
  transform: scale(0.98);
}
</style>
