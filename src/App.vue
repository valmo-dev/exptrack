<script setup>
import BudgetTable from "./components/BudgetTable.vue";
import BudgetForm from "./components/BudgetForm.vue";
import { useBudgetStore } from "./stores/budget";

const budgetStore = useBudgetStore();

function deleteItem(index) {
  budgetStore.deleteItem(index);
}

function editItem(index) {
  console.log("Modifier l'élément:", index);
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-6">Calculateur de Budget</h1>
    <BudgetForm />
    <BudgetTable
      :budgetItems="budgetStore.items"
      @delete="deleteItem"
      @edit="editItem"
    />

    <div class="mt-6 p-4 card bg-base-100 shadow-md">
      <h2 class="text-xl font-bold mb-4">Résumé</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="stat">
          <div class="stat-title">Total des revenus</div>
          <div class="stat-value">{{ budgetStore.totalRevenus }} €</div>
        </div>
        <div class="stat">
          <div class="stat-title">Total des charges</div>
          <div class="stat-value">{{ budgetStore.totalCharges }} €</div>
        </div>
        <div class="stat">
          <div class="stat-title">Budget restant</div>
          <div class="stat-value">{{ budgetStore.restBudget }} €</div>
        </div>
        <div class="stat">
          <div class="stat-title">Potentiel d'épargne</div>
          <div class="stat-value">{{ budgetStore.savingPotential }} €</div>
        </div>
        <div class="stat">
          <div class="stat-title">Répartition des revenus</div>
          <div class="stat-value">
            <div class="flex flex-col">
              <div class="flex justify-between">
                <span>Marine</span>
                <span>{{ budgetStore.contributions.marine }} €</span>
              </div>
              <div class="flex justify-between">
                <span>Valentin</span>
                <span>{{ budgetStore.contributions.valentin }} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
