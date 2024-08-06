<script setup>
import { ref } from "vue";
const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <div class="container">
    <div class="login-form">
      <img alt="Codeway logo" class="logo" src="../assets/icon.png" />
      <h1>Please sign in</h1>
      <div class="form-inputs">
        <input type="text" placeholder="E-mail address" />
        <input type="text" placeholder="Password" />
      </div>
      <button class="button">Sign In</button>
    </div>
    <div class="copyright">
      <span>Codeway © {{ currentYear }}</span>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 8px;
  color: gray;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px
}

.login-form {
  width: 20%;
}

.form-inputs {
  display: flex;
  flex-direction: column;
}

.form-inputs input {
  font-size: 18px;
  padding: 5px;
  border-radius: 8px;
  border: 2px solid gray;
  outline: none;
  background-color: transparent;
}

.form-inputs input:focus {
  border-color: red !important;
}

.form-inputs input:nth-child(1) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: transparent;
}

.form-inputs input:last-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.login-form .button {
  width: 100%;
  margin-top: 15px;
}

.logo {
  display: block;
  margin: 20px auto;
  max-height: 200px;
  width: auto;
}

.copyright {
  margin-top: 40px;
  text-align: center;
}
</style>
