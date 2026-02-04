<template>
  <template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            Quasar Framework
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
</template>

<script setup>
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: black;
}

html,
body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: white;
}

#app {
  width: 100%;
  max-width: 1920px;
  min-height: 100%;
  background: white;
}
</style>
