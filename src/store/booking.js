import { handleApi } from "@/untils/handleApi";
import axios from "../config/axios.js";
const application = {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    getDetailBooking(_, params) {
      return {
        data: {
          id: 1,
          firstName: "long 1231111",
          lastName: "thanh",
          dob: "2023-01-01 00:00:00+00",
          email: "long.nt2607@gmail.com",
          password:
            "$2b$10$UsZqkC2nBQlLN5KCMYp5.e4CyenTDjW0Kx0UwEnJ3UdjBFTln/OjS",
          gender: null,
          phoneCountryCode: "+84",
          phoneNumber: "342899284",
          nationality: null,
          bookingType: "EMPLOYEE",
          status: "inactive",
        },
      };
    },
    removeBooking(_, params) {
      // return handleApi(axios.get("/api/booking/get", { params }));
    },
    addNewBooking(_, params) {
      // return handleApi(axios.get("/api/booking/get", { params }));
    },
    updateBookingStatus(_, params) {
      // return handleApi(axios.get("/api/booking/get", { params }));
    },
    getListBooking(_, params) {
      return {
        data: [
          {
            id: 1,
            referenceNo: "XXXX123",
            requestStartAt: "2023-01-01 00:00:00+00",
            requestEndAt: "2023-012-01 00:00:00+00",
            pricePerDay: 2,
            totalPrice: 10,
            status: "pending",
            car: {
              id: 1,
              name: "Car"
            },
            user: {
              id: 1,
              email: "test@gmail.com"
            },
            deletedAt: "2023-06-02 04:38:03+00",
            createdAt: "2023-06-02 04:12:41.515372+00",
            updatedAt: "2023-06-02 04:38:03.952+00",
          },
        
        ],
      };
      return handleApi(axios.get("/api/booking/get", { params }));
    },
  },
};
export default application;
