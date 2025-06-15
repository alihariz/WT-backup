<template>
  <div class="transactions-view">
    <div class="transactions-header">
      <h1>All Transactions</h1>
      <button class="add-btn" @click="openModal()">+ Add Transaction</button>
    </div>

    <!-- Show loading spinner while fetching data -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Show error message if fetching fails -->
    <div v-if="error" class="error">{{ errorMessage }}</div>

    <!-- Search bar to filter transactions -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search transactions"
      />
    </div>

    <!-- Display transactions list -->
    <div class="transaction-list" v-if="!loading && !error">
      <div v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-card">
        <h3>{{ transaction.category }}</h3>
        <p>{{ transaction.amount | currency }}</p>
        <p>{{ transaction.date }}</p>
        <p>{{ transaction.description }}</p>
        <button @click="openModal(transaction)">Edit</button>
        <button @click="deleteTransaction(transaction.id)">Delete</button>
      </div>
    </div>

    <!-- Transaction Modal for adding or editing transactions -->
    <TransactionModal
      :show="showModal"
      :transaction="editingTransaction"
      @close="closeModal"
      @save="handleSaveTransaction"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../utils/api';
import TransactionModal from '../components/TransactionModal.vue';

const transactions = ref([]);
const showModal = ref(false);
const editingTransaction = ref(null);
const searchQuery = ref('');
const loading = ref(false);
const error = ref(false);
const errorMessage = ref('');

// Fetch all transactions when the component mounts
const fetchTransactions = async () => {
  loading.value = true;
  error.value = false;
  try {
    transactions.value = await api.getTransactions();
  } catch (err) {
    error.value = true;
    errorMessage.value = err.message || 'Failed to load transactions';
  } finally {
    loading.value = false;
  }
};

// Filter transactions based on search query
const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => 
    transaction.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (transaction.description && transaction.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

// Open the modal to add or edit a transaction
const openModal = (transaction = null) => {
  editingTransaction.value = transaction;
  showModal.value = true;
};

// Close the modal
const closeModal = () => {
  showModal.value = false;
  editingTransaction.value = null;
};

// Save a new or updated transaction
const handleSaveTransaction = async (transaction) => {
  try {
    if (editingTransaction.value) {
      await api.updateTransaction(editingTransaction.value.id, transaction);
    } else {
      await api.createTransaction(transaction);
    }
    fetchTransactions();  // Reload transactions after saving
    closeModal();
  } catch (err) {
    error.value = true;
    errorMessage.value = err.message || 'Failed to save transaction';
  }
};

// Delete a transaction
const deleteTransaction = async (id) => {
  try {
    await api.deleteTransaction(id);
    fetchTransactions();  // Reload transactions after deletion
  } catch (err) {
    error.value = true;
    errorMessage.value = err.message || 'Failed to delete transaction';
  }
};

onMounted(fetchTransactions);
</script>

<style scoped>
/* Add your custom styles here */
</style>
