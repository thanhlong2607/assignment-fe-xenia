import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export function dashboardCompasable() {
  const listFileAccept = ["image/png", "image/jpeg", "application/pdf"];
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const userInfo = computed(() => store.state.authentication.userInfo);
  const userProfile = computed(() => store.state.myProfile.userProfile);
  return {
    route,
    router,
    store,
    userInfo,
    listFileAccept,
    userProfile
  };
}
