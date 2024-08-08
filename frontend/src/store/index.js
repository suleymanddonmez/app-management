// store/index.js
import { createStore } from "vuex";

var timer = null;

export default createStore({
  state: {
    notification: {
      type: "",
      message: "",
      visible: false,
    },
    modal: {
      title: "",
      message: "",
      confirm: null,
      close: null,
      visible: false,
    },
  },
  mutations: {
    showNotification(state, payload) {
      state.notification = { ...payload, visible: true };
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        state.notification.visible = false;
      }, 3000);
    },
    showModal(state, payload) {
      state.modal = { ...payload, visible: true };
    },
    closeModal(state) {
      state.modal = { ...state.modal, visible: false };
    },
  },
  actions: {
    triggerNotification({ commit }, payload) {
      commit("showNotification", payload);
    },
    triggerModal({ commit }, payload) {
      commit("showModal", payload);
    },
    triggerCloseModal({ commit }) {
      commit("closeModal");
    },
  },
});
