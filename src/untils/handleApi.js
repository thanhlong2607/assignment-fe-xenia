
import store from "../store"
import router from "@/router";
export function handleApi(serviceFunction) {
  return new Promise((resolve, reject) => {
    serviceFunction.then(response => resolve(response))
      .catch(e => {
        if (e.response && e.response.status === 401 && e.response.data && (e.response.data.code == 100 || e.response.data.code == 101 || e.response.data.code == 102 || e.response.data.code == 103 || e.response.data.code == 104)) {
          store.dispatch("logOut").then(() => {
            router.push({ name: 'signIn' })
          })
        }
        return reject(e)
      })
  })
}