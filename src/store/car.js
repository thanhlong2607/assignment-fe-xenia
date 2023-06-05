import { handleApi } from "@/untils/handleApi";
import axios from "../config/axios.js";
const application = {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async getDetailCar(_, params) {
      console.log(params);
      const resp = await handleApi(axios.get(`/api/cars/${params.id ||params }`));
      return  resp.data
    },
    async removeCar(_, params) {
      const resp = await handleApi(axios.delete(`/api/cars/${id}`));
      return  resp.data
    },
    addNewCar(_, params) {
      return handleApi(axios.post("/api/cars", { params }));
    },
    editCar(_, params) {
      return handleApi(axios.put(`/api/cars/${id}`, { params }));
    },
    async getListCar(_, params) {
     
      const resp = await handleApi(axios.get("/api/cars", { params: { carNumber: params.carNumber, status: params.status} })); 
      return {
        data: resp.data.data.items
      }
    },
  },
};
export default application;
