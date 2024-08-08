<template>
  <header>
    <img alt="Codeway logo" class="logo" src="../assets/icon.png" />
    <div class="dropdown">
      <button class="icon-button" @click="toggleDropdown">
        <div class="icon"><IconAccount /></div>
        <div class="arrow"><component class="icon" :is="iconArrow" /></div>
      </button>
      <div v-if="isOpen" class="dropdown-content">
        <a v-for="option in options" :key="option" @click="selectOption(option)">
          {{ option.text }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import IconAccount from "./icons/IconAccount.vue";
import IconArrowDown from "./icons/IconArrowDown.vue";
import IconArrowUp from "./icons/IconArrowUp.vue";
import { fetchApi, requests } from "@/api/client";

const router = useRouter();

const isOpen = ref(false);
const options = [
  {
    text: "Logout",
    onClick: logout,
  },
];

async function logout() {
  await fetchApi(requests.logout, "POST");
  localStorage.removeItem("access-token");
  router.push("/signin");
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  option.onClick?.();
  isOpen.value = false;
}

const iconArrow = computed(() => {
  switch (isOpen.value) {
    case false:
      return IconArrowDown;
    case true:
      return IconArrowUp;
    default:
      return IconArrowDown;
  }
});
</script>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
}

.arrow {
  width: 15px;
  height: 15px;
  fill: white;
}

.logo {
  max-height: 40px;
  width: auto;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.icon-button {
  background: transparent;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  right: 0px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>
