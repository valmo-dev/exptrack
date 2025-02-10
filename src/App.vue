<script setup>
import { computed } from "vue";
import BudgetTable from "./components/BudgetTable.vue";
import BudgetForm from "./components/BudgetForm.vue";
import { useBudgetStore } from "./stores/budget";

const budgetStore = useBudgetStore();

function deleteItem(index) {
  budgetStore.deleteItem(index);
}

function editItem(index, updatedItem) {
  budgetStore.editItem(index, updatedItem);
}

const savingRateMarine = computed({
  get: () => budgetStore.savingRateMarine,
  set: (value) => budgetStore.setSavingRateMarine(value),
});

const savingRateValentin = computed({
  get: () => budgetStore.savingRateValentin,
  set: (value) => budgetStore.setSavingRateValentin(value),
});
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="container mx-auto p-6">
      <div class="w-80 flex flex-row items-center justify-center">
        <img
          src="/src/assets/exptrack.svg"
          alt="ExpTrack"
          class="w-32 h-32 mx-auto mb-8"
        />
        <div class="prose prose-lg mx-auto mb-8">
          <h1 class="text-3xl font-bold text-center">ExpTrack</h1>
        </div>
      </div>

      <BudgetForm />

      <BudgetTable
        :budgetItems="budgetStore.items"
        @delete="deleteItem"
        @edit="editItem"
      />

      <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Carte Marine -->
        <div class="card bg-base-100 shadow-xl p-6">
          <h2 class="text-xl font-bold mb-4">Résumé - Marine</h2>
          <div class="space-y-2">
            <p>
              <strong>Revenu attribué :</strong>
              {{ budgetStore.contributions.Marine }} €
            </p>
            <p>
              <strong>Charges personnelles :</strong>
              {{ budgetStore.totalPersonalChargesMarine }} €
            </p>
            <p>
              <strong>Charges communes (part) :</strong>
              {{
                (
                  budgetStore.totalCommunalCharges *
                  (budgetStore.communalChargesDistribution.Marine / 100)
                ).toFixed(2)
              }}
              €
            </p>
            <p>
              <strong>Charges effectives :</strong>
              {{ budgetStore.effectiveChargesMarine }} €
            </p>
            <p><strong>Revenu net :</strong> {{ budgetStore.netMarine }} €</p>
            <!-- Input custom pour gérer le taux d'épargne de Marine -->
            <div class="mt-4">
              <label class="block mb-1 font-semibold">
                Taux d'épargne désiré : {{ savingRateMarine }}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                v-model="savingRateMarine"
                class="range range-primary"
              />
            </div>
            <p>
              <strong>Potentiel d'épargne :</strong>
              {{ budgetStore.savingPotentialMarine }} €
            </p>
            <p>
              <strong>Reste après épargne :</strong>
              {{ budgetStore.remainingAfterSavingMarine }} €
            </p>
          </div>
        </div>
        <!-- Carte Valentin -->
        <div class="card bg-base-100 shadow-xl p-6">
          <h2 class="text-xl font-bold mb-4">Résumé - Valentin</h2>
          <div class="space-y-2">
            <p>
              <strong>Revenu attribué :</strong>
              {{ budgetStore.contributions.Valentin }} €
            </p>
            <p>
              <strong>Charges personnelles :</strong>
              {{ budgetStore.totalPersonalChargesValentin }} €
            </p>
            <p>
              <strong>Charges communes (part) :</strong>
              {{
                (
                  budgetStore.totalCommunalCharges *
                  (budgetStore.communalChargesDistribution.Valentin / 100)
                ).toFixed(2)
              }}
              €
            </p>
            <p>
              <strong>Charges effectives :</strong>
              {{ budgetStore.effectiveChargesValentin }} €
            </p>
            <p><strong>Revenu net :</strong> {{ budgetStore.netValentin }} €</p>
            <!-- Input custom pour gérer le taux d'épargne de Valentin -->
            <div class="mt-4">
              <label class="block mb-1 font-semibold">
                Taux d'épargne désiré : {{ savingRateValentin }}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                v-model="savingRateValentin"
                class="range range-primary"
              />
            </div>
            <p>
              <strong>Potentiel d'épargne :</strong>
              {{ budgetStore.savingPotentialValentin }} €
            </p>
            <p>
              <strong>Reste après épargne :</strong>
              {{ budgetStore.remainingAfterSavingValentin }} €
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
