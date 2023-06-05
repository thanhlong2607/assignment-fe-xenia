const languge = {
  state: () => {
    return {
      currentLanguage: localStorage.getItem("languge") || "english",
    };
  },
  getters: {},
  mutations: {
    changeLanguge(state, value) {
      state.currentLanguage = value;
      localStorage.setItem("language", value);
    },
  },
  actions: {},
};

export default languge;
