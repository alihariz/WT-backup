<script setup lang="ts">
import { ref } from 'vue'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const activeMonth = ref('May')

function selectMonth(month: string) {
  activeMonth.value = month
  store.setSelectedMonth(month)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>Select Month</h2>
    </div>
    <div class="month-list">
      <button
        v-for="month in months"
        :key="month"
        :class="['month-btn', activeMonth === month ? 'active' : '']"
        @click="selectMonth(month)"
      >
        {{ month }}
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background-color: rgba(26, 32, 44, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header {
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.month-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.month-btn {
  background-color: transparent;
  color: var(--text-light);
  border: none;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s;
}

.month-btn:hover {
  background-color: rgba(45, 55, 72, 0.7);
}

.month-btn.active {
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    padding: 1rem;
  }
  
  .month-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .month-btn {
    text-align: center;
    padding: 0.5rem;
  }
}
</style>