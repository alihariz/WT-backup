<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <aside class="quick-actions">
    <div class="actions-header">
      <h2>Quick Actions</h2>
    </div>
    <div class="actions-buttons">
      <button class="action-btn" @click="navigateTo('/')">Home</button>
      <button class="action-btn" @click="navigateTo('/transactions')">Transactions</button>
      <button class="action-btn" @click="navigateTo('/statistics')">Statistics</button>
    </div>
  </aside>
</template>

<style scoped>
.quick-actions {
  width: 240px;
  background-color: rgba(26, 32, 44, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.actions-header {
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.actions-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-btn {
  padding: 0.75rem 1rem;
  background-color: var(--card-bg);
  color: var(--text-light);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .quick-actions {
    width: 100%;
    padding: 1rem;
  }
  
  .actions-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
}
</style>