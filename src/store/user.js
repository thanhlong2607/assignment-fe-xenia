import { handleApi } from "@/untils/handleApi";
import axios from "../config/axios.js";
const application = {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async getDetailUser(_, params) {
      const resp = await handleApi(axios.get(`/api/users/${params.id}`));
      return  resp.data
    },
    async removeUser(_, id) {
      const resp = await handleApi(axios.delete(`/api/users/${id}`));
      return  resp.data
    },
    addNewUser(_, params) {
      return handleApi(axios.post("/api/users", { params }));
    },
    editUser(_, params) {
      return handleApi(axios.put(`/api/users/${id}`, { params }));
    },
    async getListUser(_, params) {
      const resp = await handleApi(axios.get("/api/users", { params: { email: params.email, status: params.status} })); 
      return {
        data: resp.data.data.items
      }
    },
  },
};
export default application;
