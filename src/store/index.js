import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    getNewMessage({ commit }, obj) {
      commit("new_message", obj);
    },
    getToken({ commit }, token) {
      commit("token", token);
    },
    userDetails({ commit }, userName) {
      commit("userDetails", userName);
    },
    disconnected({ commit }, user) {
      commit("disconnected", user);
    },
    connected({ commit }, user) {
      commit("connected", user);
    },
  },
  mutations: {
    new_message(state, obj) {
      state.messages.push(obj);
    },
    token(state, token) {
      state.currentToken = token;
    },
    userDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    disconnected(state, user) {
      const filter = state.userStatus.filter((el) => {
        if (el.id != user.id) return el;
      });

      state.userStatus = filter;
    },
    connected(state, user) {
      state.userStatus = state.userStatus.concat(user);
    },
  },
  state: {
    messages: [],
    userDetails: {},
    currentToken: "",
    userStatus: [],
  },
});
