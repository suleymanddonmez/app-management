<template>
  <!-- <div v-if="notification.visible" class="notification" :class="notification.type"><component class="icon" :is="iconComponent" /> {{ notification.message }}</div> -->
  <div v-if="modal.visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h3>{{ modal.title }}</h3>
      <div class="modal-body">
        <slot>{{ modal.message }}</slot>
      </div>
      <div class="modal-footer">
        <button @click="confirmModal" class="btn-sm bg-success">Confirm</button>
        <button @click="closeModal" class="btn-sm bg-danger">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const modal = computed(() => store.state.modal);

function closeModal() {
  modal.value.close?.();
  store.dispatch("triggerCloseModal");
}

function confirmModal() {
  modal.value.confirm?.();
  closeModal();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal h3 {
  font-size: 18px;
  font-weight: 600;
}

.modal-body {
  margin: 15px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
