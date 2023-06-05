import axios from "../config/axios.js";
import { handleApi } from "../untils/handleApi.js";
const authentication = {
  state: () => ({
    userInfo: {},
  }),
  getters: {},
  mutations: {
    setUserInfo(state, value) {
      state.userInfo = { ...value };
    },
  },
  actions: {
    logIn({ commit }, account) {
      return handleApi(axios.post("/api/auth/log-in", account)).then(
        (response) => {
          if (response.data.firstLogin) {
            commit("setUserInfo", {
              ...response.data,
              password: account.password,
            });
          } else {
            commit("setUserInfo", { ...response.data });
          }
          axios.defaults.headers.common[
            "Authorization"
          ] = `${response.data.tokenType} ${response.data.accessToken}`;
          return response;
        }
      );
    },
    logOut({ commit }) {
      commit("setUserInfo", {});
      commit("changeUserProfile", {}, { root: true });
      axios.defaults.headers.common["Authorization"] = "";
      return;
      // handleApi(axios.get("/api/auth/log-out")).then(response => {
      // })
    },
  },
};
export default authentication;
