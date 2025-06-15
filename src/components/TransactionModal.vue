<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ transaction ? 'Edit Transaction' : 'Add Transaction' }}</h2>
      <form @submit.prevent="saveTransaction">
        <label for="category">Category:</label>
        <input type="text" v-model="transaction.category" required />

        <label for="amount">Amount:</label>
        <input type="number" v-model="transaction.amount" required />

        <label for="date">Date:</label>
        <input type="date" v-model="transaction.date" required />

        <label for="description">Description:</label>
        <textarea v-model="transaction.description"></textarea>

        <button type="submit">{{ transaction ? 'Save Changes' : 'Add Transaction' }}</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  transaction: Object
});

const emit = defineEmits(['close', 'save']);

const saveTransaction = () => {
  emit('save', props.transaction);
};
</script>

<style scoped>
/* Add your modal styles here */
</style>
