<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import { formatCurrency } from '../utils/formatter'
import TransactionModal from '../components/TransactionModal.vue'

const store = useTransactionStore()
const showModal = ref(false)
const selectedMonth = ref('May')

const transactions = computed(() => store.getTransactionsByMonth(selectedMonth.value))
const totalAmount = computed(() => store.getTotalByMonth(selectedMonth.value))
const totalIncome = computed(() => 
  transactions.value
    .filter(t => t.category === 'Freelance' || t.category === 'Online Sale')
    .reduce((sum, t) => sum + t.amount, 0)
)
const totalExpenses = computed(() => 
  transactions.value
    .filter(t => t.category !== 'Freelance' && t.category !== 'Online Sale')
    .reduce((sum, t) => sum + t.amount, 0)
)

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleAddTransaction(transaction: any) {
  store.addTransaction(transaction)
  closeModal()
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>{{ selectedMonth }} Overview</h1>
      <button class="add-btn" @click="openModal">+ Add Transaction</button>
    </div>

    <div class="summary-cards">
      <div class="card summary-card income">
        <h3>Total Income</h3>
        <p class="amount">{{ formatCurrency(totalIncome) }}</p>
        <div class="card-icon">💰</div>
      </div>
      
      <div class="card summary-card expenses">
        <h3>Total Expenses</h3>
        <p class="amount">{{ formatCurrency(totalExpenses) }}</p>
        <div class="card-icon">💳</div>
      </div>
      
      <div class="card summary-card balance">
        <h3>Net Balance</h3>
        <p class="amount" :class="{ 'positive': totalIncome > totalExpenses }">
          {{ formatCurrency(totalIncome - totalExpenses) }}
        </p>
        <div class="card-icon">📊</div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="card transactions-card">
        <div class="card-header">
          <h3>Recent Transactions</h3>
          <div class="transaction-count">
            {{ transactions.length }} transactions this month
          </div>
        </div>
        
        <div class="transaction-list">
          <div v-for="transaction in transactions.slice(0, 5)" :key="transaction.id" 
               class="transaction-item hover-effect">
            <div class="transaction-info">
              <div class="transaction-category">
                <span class="category-icon">
                  {{ transaction.category === 'Freelance' || transaction.category === 'Online Sale' ? '↗️' : '↘️' }}
                </span>
                <h4>{{ transaction.category }}</h4>
              </div>
              <p class="transaction-date">{{ transaction.date }}</p>
              <p class="transaction-description" v-if="transaction.description">
                {{ transaction.description }}
              </p>
            </div>
            <p class="transaction-amount" :class="{
              'income': transaction.category === 'Freelance' || transaction.category === 'Online Sale'
            }">
              {{ formatCurrency(transaction.amount) }}
            </p>
          </div>
          <div v-if="transactions.length === 0" class="no-transactions">
            No transactions found for {{ selectedMonth }}
          </div>
        </div>
      </div>
    </div>

    <TransactionModal 
      v-if="showModal" 
      @close="closeModal" 
      @add-transaction="handleAddTransaction" 
    />
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.summary-card {
  position: relative;
  padding: 1.5rem;
  overflow: hidden;
}

.summary-card h3 {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.summary-card .amount {
  font-size: 1.8rem;
  font-weight: 700;
}

.income .amount {
  color: #10B981;
}

.expenses .amount {
  color: #EF4444;
}

.balance .amount {
  color: #EF4444;
}

.balance .amount.positive {
  color: #10B981;
}

.card-icon {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  opacity: 0.2;
}

.add-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
}

.add-btn:hover {
  background-color: var(--primary-dark);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.transaction-count {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: rgba(45, 55, 72, 0.5);
  cursor: pointer;
}

.transaction-item:hover {
  background-color: rgba(45, 55, 72, 0.8);
}

.transaction-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.category-icon {
  font-size: 1.2rem;
}

.transaction-date {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.transaction-description {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.transaction-amount {
  font-weight: 600;
  font-size: 1.125rem;
  color: #EF4444;
}

.transaction-amount.income {
  color: #10B981;
}

.no-transactions {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .transaction-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .transaction-amount {
    align-self: flex-end;
  }
}
</style>