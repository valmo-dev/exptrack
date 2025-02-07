<script setup>
import { ref } from "vue";
import { useBudgetStore } from "../stores/budget";

/* Pattern des composables inline pour séparer la logique en petites fonctions */

function useBudgetForm() {
  const budgetStore = useBudgetStore();

  const type = ref("Revenu");
  const category = ref("");
  const amount = ref(0);

  function submitForm() {
    if (category.value.trim() && amount.value > 0) {
      const newItem = {
        type: type.value,
        category: category.value,
        amount: amount.value,
      };
      budgetStore.addItem(newItem);
      category.value = "";
      amount.value = 0;
      type.value = "Revenu";
    }
  }

  return {
    type,
    category,
    amount,
    submitForm,
  };
}

const { type, category, amount, submitForm } = useBudgetForm();
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Ajouter une entrée</h2>

    <form @submit.prevent="submitForm" class="space-y-4 grid grid-cols-1 gap-4">
      <div>
        <label for="type" class="fieldset-label">Type d'entrée</label>
        <select id="type" v-model="type" class="select w-full">
          <option value="Revenu">Revenus</option>
          <option value="Charge">Charges</option>
        </select>
      </div>
      <div>
        <label for="category" class="fieldset-label">Catégorie</label>
        <input
          id="category"
          v-model="category"
          type="text"
          placeholder="Exemple : Salaire, loyer, nourriture, etc."
          class="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label for="amount" class="fieldset-label">Montant (€)</label>
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          class="input input-bordered w-full"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>