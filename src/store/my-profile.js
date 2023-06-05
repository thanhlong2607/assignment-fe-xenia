import { handleApi } from "@/untils/handleApi"
import axios from "../config/axios.js";
const myProfile = {
  state: () =>({
    userProfile: {}
  }),
  getters: {

  },
  mutations: {
    changeUserProfile(state, data){
      state.userProfile = {...data}
    }
  },
  actions:{
    getMyProfile(context){
      return handleApi(axios.get("/api/profile")).then(response =>{
        context.commit("changeUserProfile", response.data)
        return response
      })
    },
    updateProfile(context, data){
      return handleApi(axios.put("/api/profile", data));
    }
  }
}
export default myProfile