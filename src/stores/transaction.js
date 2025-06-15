import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([
    { id: '1', category: 'Groceries', amount: 120.50, date: 'May 2, 2024', description: 'Weekly grocery shopping' },
    { id: '2', category: 'Utilities', amount: 85.00, date: 'May 5, 2024', description: 'Electricity bill' },
    { id: '3', category: 'Transport', amount: 45.75, date: 'May 7, 2024', description: 'Fuel' },
    { id: '4', category: 'Dining', amount: 60.25, date: 'May 10, 2024', description: 'Dinner with friends' },
    { id: '5', category: 'Freelance', amount: 500.00, date: 'May 11, 2024', description: 'Website design payment' },
    { id: '6', category: 'Internet', amount: 90.00, date: 'May 12, 2024', description: 'Monthly internet subscription' },
    { id: '7', category: 'Movie', amount: 35.00, date: 'May 15, 2024', description: 'Cinema tickets' },
    { id: '8', category: 'Online Sale', amount: 150.00, date: 'May 16, 2024', description: 'Amazon purchase' },
    { id: '9', category: 'Shopping', amount: 75.00, date: 'May 18, 2024', description: 'Clothes purchase' }
  ])

  const getTransactionsByMonth = (month) => {
    return transactions.value.filter(transaction => transaction.date.includes(month))
  }

  const getTotalByMonth = (month) => {
    return getTransactionsByMonth(month).reduce((sum, transaction) => sum + transaction.amount, 0)
  }

  const addTransaction = (transaction) => {
    transactions.value.push(transaction)
  }

  const updateTransaction = (transaction) => {
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index !== -1) {
      transactions.value[index] = transaction
    }
  }

  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(transaction => transaction.id !== id)
  }

  return {
    transactions,
    getTransactionsByMonth,
    getTotalByMonth,
    addTransaction,
    updateTransaction,
    deleteTransaction
  }
})
