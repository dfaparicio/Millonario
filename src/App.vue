<template>
  <q-app>
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </q-app>
</template>

<script setup>
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #000;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden; 
  overflow-y: auto;  
}

#app {
  height: 100vh;
  width: 100vw;
}
</style>

