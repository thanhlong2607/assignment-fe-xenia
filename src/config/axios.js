import axios from "axios";
const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.VUE_APP_API,
});
export default axiosInstance;
