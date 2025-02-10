<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  item: Object,
});

const emit = defineEmits(["close", "save"]);

const editedItem = ref({ ...props.item });

watch(
  () => props.item,
  (newItem) => {
    editedItem.value = { ...newItem };
  }
);

function handleSubmit() {
  emit("save", editedItem.value);
  emit("close");
}
</script>

<template>
  <dialog :class="isOpen ? 'modal modal-open' : 'modal'" @click="emit('close')">
    <div class="modal-box" @click.stop>
      <h3 class="font-bold text-lg mb-4">Modifier l'entrée</h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="form-control">
          <label for="amount" class="fieldset-label my-2">Montant (€)</label>
          <input
            id="amount"
            v-model.number="editedItem.amount"
            type="number"
            class="input input-bordered"
            step="0.01"
            required
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn btn-accent" @click="emit('close')">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary">Sauvegarder</button>
        </div>
      </form>
    </div>
  </dialog>
</template>