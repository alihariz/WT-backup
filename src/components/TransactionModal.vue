<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'add-transaction'])

const categories = [
  'Groceries', 'Utilities', 'Transport', 'Dining', 'Freelance', 
  'Internet', 'Movie', 'Online Sale', 'Shopping', 'Petrol', 'Insurance'
]

const newTransaction = ref({
  id: '',
  category: '',
  amount: 0,
  date: '',
  description: ''
})

onMounted(() => {
  if (props.transaction) {
    newTransaction.value = { ...props.transaction }
  } else {
    // Set default date to today
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    newTransaction.value.date = `${year}-${month}-${day}`
  }
})

function closeModal() {
  emit('close')
}

function saveTransaction() {
  if (!newTransaction.value.category || newTransaction.value.amount <= 0) {
    return
  }
  
  const transaction = {
    ...newTransaction.value,
    id: props.transaction?.id || crypto.randomUUID(),
    amount: Number(newTransaction.value.amount)
  }
  
  emit('add-transaction', transaction)
}

function stopPropagation(e: Event) {
  e.stopPropagation()
}
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click="stopPropagation">
      <div class="modal-header">
        <h3>{{ props.transaction ? 'Edit Transaction' : 'Add Transaction' }}</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="newTransaction.category" required>
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="amount">Amount (RM)</label>
          <input 
            type="number" 
            id="amount" 
            v-model.number="newTransaction.amount" 
            min="0" 
            step="0.01" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="date">Date</label>
          <input 
            type="date" 
            id="date" 
            v-model="newTransaction.date" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="description">Description (Optional)</label>
          <textarea 
            id="description" 
            v-model="newTransaction.description" 
            rows="3"
          ></textarea>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="cancel-btn" @click="closeModal">Cancel</button>
        <button class="save-btn" @click="saveTransaction">
          {{ props.transaction ? 'Update' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  animation: modal-in 0.3s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(45, 55, 72, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text-light);
  font-size: 1rem;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cancel-btn {
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.save-btn {
  background-color: var(--primary-color);
}
</style>