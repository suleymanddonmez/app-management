<template>
  <div v-if="notification.visible" class="notification" :class="notification.type"><component class="icon" :is="iconComponent" /> {{ notification.message }}</div>
</template>

<script setup>
import IconSpinner from "./icons/IconSpinner.vue";
import IconFalse from "./icons/IconFalse.vue";
import IconTrue from "./icons/IconTrue.vue";
import IconInfo from "./icons/IconInfo.vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const notification = computed(() => store.state.notification);

const iconComponent = computed(() => {
  switch (notification.value.type) {
    case "success":
      return IconTrue;
    case "error":
      return IconFalse;
    case "info":
      return IconInfo;
    case "loading":
      return IconSpinner;
    default:
      return null;
  }
});

</script>

<style>
.notification {
  position: fixed;
  min-width: 250px;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(234, 79, 108);
  color: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  flex-wrap: wrap;
}
.notification.info {
  background: linear-gradient(10deg, rgba(58, 98, 236) 0%, rgba(61, 124, 238) 70%, rgba(64, 136, 240) 100%);
}
.notification.success {
  background: linear-gradient(10deg, rgba(68, 160, 229) 0%, rgba(94, 207, 209) 70%, rgba(108, 233, 200) 100%);
}
.notification.error {
  background: linear-gradient(10deg, rgba(219, 65, 50) 0%, rgba(229, 89, 110) 70%, rgba(233, 101, 140) 100%);
}
.icon {
  max-width: 24px;
  max-height: 24px;
  fill: white;
}
</style>
