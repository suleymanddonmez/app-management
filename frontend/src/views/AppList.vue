<script setup>
import { fetchApi, requests } from "@/api/client";
import AppHeader from "@/components/AppHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// apps.value = [
//   {
//     id: 1,
//     parameterKey: "min_version",
//     value: "1.4.4",
//     description: "Minimum required version of the app",
//     createdDate: "10/05/2021 01:58",
//   },
//   {
//     id: 2,
//     parameterKey: "latest_version",
//     value: "1.4.7",
//     description: "Latest version of the app",
//     createdDate: "10/05/2021 01:58",
//   },
//   {
//     id: 3,
//     parameterKey: "pricing_tier",
//     value: "t6",
//     description: "Pricing tier of the user",
//     createdDate: "07/07/2021 11:13",
//   },
//   {
//     id: 4,
//     parameterKey: "scroll",
//     value: "5",
//     description: "Index of Scroll Paywall for free users",
//     createdDate: "25/08/2021 10:22",
//   },
//   {
//     id: 5,
//     parameterKey: "scroll_limit",
//     value: "13",
//     description: "Index of Scroll Limit Paywall for free users",
//     createdDate: "25/08/2021 10:23",
//   },
// ];

const router = useRouter();
const store = useStore();
function triggerNotification(type, message) {
  store.dispatch("triggerNotification", { type, message });
}

const apps = ref([]);
const newParameter = ref("");
const newValue = ref("");
const newDescription = ref("");

const getApps = async () => {
  const response = await fetchApi(requests.getApps);
  if (response.success) {
    apps.value = response.data;
  } else {
    router.push("/signin");
  }
};

const editApp = (appId) => {
  console.log("edit", appId);
};

const deleteApp = (appId) => {
  apps.value = apps.value.filter((a) => a.id != appId);
};

const addApp = async () => {
  triggerNotification("loading", "Loading...");
  if (newParameter.value && newValue.value && newDescription.value) {
    const response = await fetchApi(requests.addApp, "POST", {
      parameterKey: newParameter.value,
      value: newValue.value,
      description: newDescription.value,
    });
    if (response.success) {
      newParameter.value = "";
      newValue.value = "";
      newDescription.value = "";
      triggerNotification("success", "Saved new app successfully");
      getApps();
    } else {
      triggerNotification("error", response.error);
    }
  } else {
    triggerNotification("error", "Please fill in all fields");
  }
};

onMounted(() => {
  triggerNotification("loading", "Loading...");
  getApps();
  triggerNotification("success", "Data updated successfully");
});
</script>

<template>
  <AppHeader />
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
          <tr v-for="app in apps" :key="app.id">
            <td>{{ app.parameterKey }}</td>
            <td>{{ app.value }}</td>
            <td>{{ app.description }}</td>
            <td>{{ app.createdDate }}</td>
            <td class="action-col">
              <button class="btn-sm bg-info" v-on:click="editApp(app.id)">Edit</button>
              <button class="btn-sm bg-danger" v-on:click="deleteApp(app.id)">Delete</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" placeholder="New Parameter" v-model="newParameter" /></td>
            <td><input type="text" placeholder="Value" v-model="newValue" /></td>
            <td colspan="2"><input type="text" placeholder="New Description" v-model="newDescription" /></td>
            <td><button class="btn-sm bg-success" v-on:click="addApp">ADD</button></td>
          </tr>
        </tfoot>
      </table>
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
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid rgb(45, 53, 81);
  outline: none;
  background-color: transparent;
  width: 100%;
  color: rgb(110, 117, 123);
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
</style>
