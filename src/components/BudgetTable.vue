<script setup>
const props = defineProps({
  budgetItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

function useBudgetTable(emitFunction) {
  const handleDelete = (index) => {
    emitFunction("delete", index);
  };

  const handleEdit = (index) => {
    emitFunction("edit", index);
  };

  return {
    handleDelete,
    handleEdit,
  };
}

const { handleDelete, handleEdit } = useBudgetTable(emit);
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Tableau du Budget</h2>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Catégorie</th>
            <th>Montant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in props.budgetItems" :key="index">
            <td>{{ item.type }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.amount }}</td>
            <td class="space-x-2">
              <button
                class="btn btn-sm btn-outline btn-primary"
                @click="handleEdit(index)"
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
  </div>
</template>