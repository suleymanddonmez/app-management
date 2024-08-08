<script setup>
import { fetchApi, requests } from "@/api/client";
import AppHeader from "@/components/AppHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

function triggerNotification(type, message) {
  store.dispatch("triggerNotification", { type, message });
}

function triggerModal(title, message, confirm, close) {
  store.dispatch("triggerModal", { title, message, confirm, close });
}

const apps = ref([]);
const newApp = ref({
  parameterKey: "",
  value: "",
  description: "",
});
const editedApp = ref({});

const getApps = async () => {
  triggerNotification("loading", "Loading...");
  const response = await fetchApi(requests.getApps);
  if (response.success) {
    apps.value = response.data;
    triggerNotification("success", "Data updated successfully");
  } else {
    triggerNotification("error", response.error);
    router.push("/signin");
  }
};

const editApp = async (app) => {
  const response = await fetchApi(requests.editApp, "POST", { id: app.id });
  if (response.success) {
    editedApp.value = { ...app };
  } else {
    triggerNotification("error", response.error);
  }
};

const deleteApp = (appId) => {
  triggerModal("Delete App Record", "The relevant record will be deleted. Do you confirm?", async () => {
    triggerNotification("loading", "Loading...");
    const response = await fetchApi(requests.delApp, "POST", { id: appId });
    if (response.success) {
      triggerNotification("success", "Deleted app successfully");
      getApps();
    } else {
      triggerNotification("error", response.error);
    }
  });
};

const addApp = async () => {
  triggerNotification("loading", "Loading...");
  if (newApp.value.parameterKey && newApp.value.value && newApp.value.description) {
    const response = await fetchApi(requests.addApp, "POST", {
      parameterKey: newApp.value.parameterKey,
      value: newApp.value.value,
      description: newApp.value.description,
    });
    if (response.success) {
      newApp.value.parameterKey = "";
      newApp.value.value = "";
      newApp.value.description = "";
      triggerNotification("success", "Saved new app successfully");
      getApps();
    } else {
      triggerNotification("error", response.error);
    }
  } else {
    triggerNotification("error", "Please fill in all fields");
  }
};

const saveApp = async () => {
  const response = await fetchApi(requests.updateApp, "POST", {
    id: editedApp.value.id,
    parameterKey: editedApp.value.parameterKey,
    value: editedApp.value.value,
    description: editedApp.value.description,
  });
  if (response.success) {
    editedApp.value = {};
    triggerNotification("success", "Updated app successfully");
    getApps();
  } else {
    triggerNotification("error", response.error);
  }
};

onMounted(() => {
  getApps();
});
</script>

<template>
  <AppHeader />
  <main>
    <div class="container">
      <table class="app-table hidden-mobile">
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
          <tr v-for="app in apps" :key="app.id">
            <td v-if="editedApp.id !== app.id">{{ app.parameterKey }}</td>
            <td v-else><input type="text" v-model="editedApp.parameterKey" /></td>
            <td v-if="editedApp.id !== app.id">{{ app.value }}</td>
            <td v-else><input type="text" v-model="editedApp.value" /></td>
            <td v-if="editedApp.id !== app.id">{{ app.description }}</td>
            <td v-else><input type="text" v-model="editedApp.description" /></td>
            <td>{{ app.createdDate }}</td>
            <td class="action-col">
              <button v-if="editedApp.id !== app.id" class="btn-sm bg-info" v-on:click="editApp(app)">Edit</button>
              <button v-else class="btn-sm bg-success" v-on:click="saveApp()">Save</button>
              <button class="btn-sm bg-danger" v-on:click="deleteApp(app.id)">Delete</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" placeholder="New Parameter" v-model="newApp.parameterKey" /></td>
            <td><input type="text" placeholder="Value" v-model="newApp.value" /></td>
            <td colspan="2"><input type="text" placeholder="New Description" v-model="newApp.description" /></td>
            <td><button class="btn-sm bg-success" v-on:click="addApp">ADD</button></td>
          </tr>
        </tfoot>
      </table>
      <div class="app-div visible-mobile" v-for="app in apps" :key="app.id">
        <div class="data-row">
          <span class="data-title">Parameter Key:</span>
          <span v-if="editedApp.id !== app.id">{{ app.parameterKey }}</span>
          <span v-else><input class="input-sm" type="text" v-model="editedApp.parameterKey" /></span>
        </div>
        <div class="data-row">
          <span class="data-title">Value:</span>
          <span v-if="editedApp.id !== app.id">{{ app.value }}</span>
          <span v-else><input class="input-sm" type="text" v-model="editedApp.value" /></span>
        </div>
        <div class="data-row">
          <span class="data-title">Description:</span>
          <span v-if="editedApp.id !== app.id">{{ app.description }}</span>
          <span v-else><input class="input-sm" type="text" v-model="editedApp.description" /></span>
        </div>
        <div class="data-row">
          <span class="data-title">Create Date:</span>
          <span>{{ app.createdDate }}</span>
        </div>
        <div class="data-action-row">
          <button v-if="editedApp.id !== app.id" class="btn-sm bg-info" v-on:click="editApp(app)">Edit</button>
          <button v-else class="btn-sm bg-success" v-on:click="saveApp()">Save</button>
          <button class="btn-sm bg-danger" v-on:click="deleteApp(app.id)">Delete</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 25px;
}

.app-table {
  width: 100%;
}

.app-table thead th {
  text-align: left;
  color: rgb(123, 139, 161);
  font-size: 25px;
  padding: 10px;
}

.app-table td {
  padding: 10px;
  color: rgb(210, 210, 213);
}

.app-table input {
  width: 100%;
}

.app-table input:focus {
  border-color: rgb(208, 91, 197) !important;
}

.action-col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.app-div {
  border: 2px solid white;
  border-radius: 20px;
  padding: 4px 12px;
  color: white;
  margin-bottom: 20px;
}

.data-row .data-title {
  font-weight: bold;
}

.data-row span {
  color: rgb(210, 210, 213);
  margin-right: 4px;
}

.data-action-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
</style>
