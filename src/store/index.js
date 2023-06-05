import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import language from "./language";
import authentication from "./authentication";
import myProfile from "./my-profile";
import user from "./user";
import booking from "./booking";
import car from "./car";
import until from "./until";
import application from "./application";
export default createStore({
  state: {
    showDocument: false,
    documentInfo: {
      preview: false,
      type: "application/pdf",
      source: "",
    },
    loading: false
  },
  getters: {},
  mutations: {
    toggleShowDocument(state, value) {
      state.showDocument = value;
    },
    changeDocumentInfo(state, data) {
      if(data.preview){
        state.documentInfo.preview = data.preview
      }
      state.documentInfo.type = data.type;
      state.documentInfo.source = data.source;
    },
    toggleLoading(state, value){
      state.loading = value;
      state.documentInfo.preview = false;
    }
  },
  actions: {},
  modules: {
    namespaced: true,
    language,
    authentication,
    myProfile,
    car,
    booking,
    user,
    until,
    application,
  },
  plugins: [createPersistedState()],
});
