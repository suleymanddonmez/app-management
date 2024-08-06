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
  color: rgb(50, 51, 90);
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px;
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
  padding: 15px;
  border-radius: 8px;
  border: 2px solid rgb(45, 53, 81);
  outline: none;
  background-color: transparent;
  color: rgb(110, 117, 123)
}

.form-inputs input:focus {
  border-color: rgb(208, 91, 197) !important;
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
.copyright span {
  color: rgb(110, 117, 124);
}
</style>
