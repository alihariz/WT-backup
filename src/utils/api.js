// src/utils/api.js
import axios from 'axios';

// Define the base URL for the PHP back-end API
const API_URL = 'http://localhost/404-Server/api';

export const api = {
  // GET: Fetch all transactions
  getTransactions: async () => {
    try {
      const response = await axios.get(`${API_URL}/getTransactions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // POST: Create a new transaction
  createTransaction: async (transaction) => {
    try {
      const response = await axios.post(`${API_URL}/createTransactions`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // PUT: Update an existing transaction
  updateTransaction: async (id, transaction) => {
    try {
      const response = await axios.put(`${API_URL}/updateTransactions?id=${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  // DELETE: Delete a transaction
  deleteTransaction: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteTransactions?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
};
