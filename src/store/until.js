import axios from "../config/axios.js";

const until = {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    uploadFile(context, formData) {
      return axios.post("/api/file/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    },
  },
};

export default until;
