<script setup></script>

<template>
  <header>
    <img alt="Codeway logo" class="logo" src="../assets/icon.png" />
    <button>Deneme</button>
  </header>
  <main>
    <div class="container">
      <table class="app-table">
        <thead>
          <tr>
            <th>Parameter Key</th>
            <th>Value</th>
            <th>Description</th>
            <th>Create Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Burası döngüye girecek -->
          <tr>
            <td>min_version</td>
            <td>1.4.4</td>
            <td>Minimum required version of the app</td>
            <td>10/05/2021 01:58</td>
            <td><button class="btn-sm bg-info">Edit</button> <button class="btn-sm bg-danger">Delete</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" placeholder="New Parameter" /></td>
            <td><input type="text" placeholder="Value" /></td>
            <td colspan="2"><input type="text" placeholder="New Description" /></td>

            <td><button class="btn-sm bg-success">Add</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
</template>

<style scoped>
.logo {
  max-height: 40px;
  width: auto;
}

.container {
  padding: 25px;
}

.app-table {
  width: 100%;
}

.app-table thead th {
  text-align: left;
  color: gray;
  font-size: 25px;
  padding: 10px;
}

.app-table td {
  padding: 10px;
}

.app-table input {
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid gray;
  outline: none;
  background-color: transparent;
  width: 100%;
}

.app-table input:focus {
  border-color: red !important;
}
</style>
