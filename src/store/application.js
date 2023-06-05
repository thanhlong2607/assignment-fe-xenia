import { handleApi } from "@/untils/handleApi"
import axios from "../config/axios.js";
const application = {
  state: () => ({

  }),
  getters: {

  },
  mutations: {

  },
  actions: {
    getListApplication(context, params){
      return handleApi(axios.get("/api/applications/client", {params}))
    },
    getDetailApplication(context, id){
      return handleApi(axios.get(`/api/applications/${id}/client`))
    },
    createDraftApplication(context){
      return handleApi(axios.post("/api/applications/draft"));
    },
    saveDraftApplication(context, data){
      return handleApi(axios.put(`/api/applications/draft/${data.id}`, data));
    },
    submitApplication(context, data){
      return handleApi(axios.post("/api/applications", data));
    },
    checkBannedAndIngredient(context, data){
      return handleApi(axios.post("/api/banned-restrict-product-ingredient/check", data));
    },
    getRenewList(context, params){
      return handleApi(axios.get("/api/applications/renewal/client", {params}))
    },
    getRenewApplicationDetail(context, id){
      return handleApi(axios.get(`/api/applications/${id}/renewal/client`))
    }
  }
}
export default application;