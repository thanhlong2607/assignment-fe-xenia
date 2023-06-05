import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import STATUS from "@/constants/status";
import { ElMessage } from "element-plus";
import { Roles } from "@/constants/Role";
export function pageCompasable() {
  const listFileAccept = ["image/png", "image/jpeg", "application/pdf"];
  const statusList = [
    {
      label: "common.all",
      value: ""
    },
    {
      label: "common.active",
      value: STATUS.active
    },
    {
      label: "common.delete",
      value: STATUS.inactive
    },
    ]
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
    userProfile,
    STATUS,
    statusList,
    ElMessage,
    Roles
  };
}
