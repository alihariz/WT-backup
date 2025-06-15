<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>{{ selectedMonth }} Overview</h1>
    </div>

    <div class="summary-cards">
      <div class="card summary-card income">
        <h3>Total Income</h3>
        <p class="amount">{{ totalIncome | currency }}</p>
      </div>
      <div class="card summary-card expenses">
        <h3>Total Expenses</h3>
        <p class="amount">{{ totalExpenses | currency }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../utils/api';

const selectedMonth = ref('May');
const transactions = ref([]);

// Fetch transactions for the selected month
const fetchTransactions = async () => {
  transactions.value = await api.getTransactions();
};

// Compute the total income for the selected month
const totalIncome = computed(() => {
  return transactions.value
    .filter(t => t.category === 'Freelance' || t.category === 'Online Sale')
    .reduce((sum, t) => sum + t.amount, 0);
});

// Compute the total expenses for the selected month
const totalExpenses = computed(() => {
  return transactions.value
    .filter(t => t.category !== 'Freelance' && t.category !== 'Online Sale')
    .reduce((sum, t) => sum + t.amount, 0);
});

onMounted(fetchTransactions);
</script>

<style scoped>
/* Add your styles here */
</style>
