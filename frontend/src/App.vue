<script setup>
import AppNotification from "@/components/AppNotification.vue";
import AppModal from "./components/AppModal.vue";
</script>

<template>
  <AppNotification />
  <AppModal />
  <router-view></router-view>
</template>

<style scoped></style>
