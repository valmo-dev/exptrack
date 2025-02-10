<script setup>
import { ref } from "vue";
import EditModal from "./EditModal.vue";

const props = defineProps({
  budgetItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const showEditModal = ref(false);
const selectedItem = ref(null);

function openEditModal(item, index) {
  selectedItem.value = { ...item, index };
  showEditModal.value = true;
}

function handleSave(updatedItem) {
  emit("edit", selectedItem.value.index, updatedItem);
  showEditModal.value = false;
}

function handleDelete(index) {
  emit("delete", index);
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Tableau du Budget</h2>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Assigné à</th>
            <th>Catégorie</th>
            <th>Montant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in props.budgetItems" :key="index">
            <td class="font-bold capitalize">{{ item.type }}</td>
            <td>{{ item.owner }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.amount }} €</td>
            <td class="space-x-2">
              <button
                class="btn btn-sm btn-outline btn-primary"
                @click="openEditModal(item, index)"
              >
                Modifier
              </button>
              <button
                class="btn btn-sm btn-outline btn-error"
                @click="handleDelete(index)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditModal
      :isOpen="showEditModal"
      :item="selectedItem"
      @save="handleSave"
      @close="showEditModal = false"
    />
  </div>
</template>
