<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import QuickActions from './components/QuickActions.vue'
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <RouterView />
    </main>
    <QuickActions />
  </div>
</template>

<style>
:root {
  --primary-color: #27ae60;
  --primary-dark: #219653;
  --secondary-color: #2d3748;
  --background-dark: #1a202c;
  --text-light: rgba(255, 255, 255, 0.87);
  --text-muted: rgba(255, 255, 255, 0.6);
  --card-bg: rgba(45, 55, 72, 0.7);
  --border-radius: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: var(--text-light);
  background-color: var(--background-dark);
  background-image: url('https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=1920');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

.app-container {
  display: flex;
  min-height: 100vh;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.7);
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

h1, h2, h3, h4 {
  font-weight: 600;
  line-height: 1.2;
}

button {
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.25s;
}

button:hover {
  background-color: var(--primary-dark);
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 1.5rem;
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  backdrop-filter: blur(10px);
}
</style>