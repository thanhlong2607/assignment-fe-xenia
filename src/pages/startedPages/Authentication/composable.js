import { ref } from "vue";
import { useStore } from "vuex";
export function Authentication() {
  const listFileAccept = ["image/png", "image/jpeg", "application/pdf"];
  const store = useStore();
  return {
    listFileAccept,
    store,
  };
}
