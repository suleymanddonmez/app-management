// store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    notification: {
      type: "",
      message: "",
      visible: false,
    },
  },
  mutations: {
    showNotification(state, payload) {
      state.notification = { ...payload, visible: true };
      setTimeout(() => {
        state.notification.visible = false;
      }, 3000);
    },
  },
  actions: {
    triggerNotification({ commit }, payload) {
      commit("showNotification", payload);
    },
  },
});
