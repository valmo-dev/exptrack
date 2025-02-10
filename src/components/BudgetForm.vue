<script setup>
import { ref } from "vue";
import { useBudgetStore } from "../stores/budget";

/* Pattern des composables inline pour séparer la logique en petites fonctions */

function useBudgetForm() {
  const budgetStore = useBudgetStore();

  const type = ref("Revenu");
  const owner = ref("Marine");
  const category = ref("");
  const amount = ref(0);

  function submitForm() {
    if (category.value.trim() && amount.value > 0) {
      const newItem = {
        type: type.value,
        owner: owner.value,
        category: category.value,
        amount: amount.value,
      };

      budgetStore.addItem(newItem);

      // * Reset les champs du formulaire
      category.value = "";
      amount.value = 0;
      type.value = "Revenu";
      owner.value = "Marine";
    }
  }

  return {
    type,
    owner,
    category,
    amount,
    submitForm,
  };
}

const { type, owner, category, amount, submitForm } = useBudgetForm();
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Ajouter une entrée</h2>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control">
          <label for="type" class="fieldset-label my-2">Type d'entrée</label>
          <select
            id="type"
            v-model="type"
            class="select select-bordered focus:select-primary w-full"
          >
            <option value="Revenu">Revenus</option>
            <option value="Charge">Charges</option>
          </select>
        </div>
        <div class="form-control">
          <label for="type" class="fieldset-label my-2">Assigné à</label>
          <select
            v-model="owner"
            class="select select-bordered focus:select-primary w-full"
          >
            <option>Marine</option>
            <option>Valentin</option>
            <option>Commun</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control">
          <label for="category" class="fieldset-label my-2">Catégorie</label>
          <input
            id="category"
            v-model="category"
            type="text"
            placeholder="Ex: Salaire, loyer, nourriture, etc."
            class="input input-bordered focus:input-primary w-full"
            required
          />
        </div>
        <div class="form-control">
          <label for="amount" class="fieldset-label my-2">Montant (€)</label>
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            class="input input-bordered focus:input-primary w-full"
            required
          />
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-full">Ajouter</button>
    </form>
  </div>
</template>