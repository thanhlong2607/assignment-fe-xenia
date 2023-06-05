<template>
  <div class="page-nav-bar w-64 p-6 pt-0 flex flex-col -left-full fixed lg:left-0" :class="showMenu && 'is-active'">
    <div class="page-logo py-4  w-1/2">
      <img  class="cursor-pointer" src="@/assets/images/defaultPageLogo.png" alt=""
        @click="changeRoute('dashboard')" />
    </div>
    <div class="page-menu flex flex-col h-full justify-between">
      <el-menu active-text-color="#1B1B1B" background-color="#fff"
        class="el-menu-vertical-demo flex flex-col h-full justify-between" :default-active="currentRoute" text-color="#8D8D8D">
        <div>
          <el-menu-item v-for="(item, idx) in menuByRole" :key="'menu' + idx" :index="item.routerName"
            :disabled="item.disable" @click="changeRoute(item.routerName)">
            <img class="menu-active" :src="item.iconActive" alt="" />
            <img class="menu-inactive" :src="item.iconInactive" alt="" />
            <span class="menu-label">{{ $t(item.name) }}</span>
          </el-menu-item>
        </div>
    
      </el-menu>
      <div class="text-neutral-05 text-sm font-medium border-t border-solid border-neutral-02">
        <div class="flex gap-4 p-5 mt-2 cursor-pointer rounded hover:text-neutral-08 hover:bg-blue-background"
          @click="signOut">
          <img src="@/assets/icons/log-out-icon.svg" alt="" />
          <span>{{ $t("sign_out.log_out") }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showMenu" class="menu-overlay fixed top-0 left-0 bottom-0 right-0 z-10 lg:static" @click="showMenu = false">
  </div>
  <div class="main-pages w-screen h-screen pl-0 lg:pl-64">
    <div class="bg-neutral-01 h-full">
      <div class="page-header px-12 py-4 flex justify-between items-center bg-white">
        <div class="font-bold text-xl text-neutral-08">
          <div class="flex items-center gap-4">
            <img class="w-8 h-8 cursor-pointer lg:hidden" src="@/assets/icons/menu-icon.svg" alt="" @click="toggleMenu">
            <span>{{ routeNames[currentRoute] && $t(routeNames[currentRoute]) }}</span>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="account-info flex items-center gap-3">
            <div class="account-avatar">
              <img class="h-11 w-11 rounded-full" :src="userInfo.avatarImageUrl ||
                require('@/assets/images/avatar-default.png')
                " alt="" />
            </div>
            <div class="account-profile relative">
              <div class="flex gap-3 items-center cursor-pointer">
                <span class="text-sm font-bold text-neutral-08">
                  {{ userProfile.firstName || userInfo.firstName }} {{ userProfile.lastName || userInfo.lastName }}</span>
                <img src="@/assets/icons/dropdown-icon.svg" alt="" />
              </div>
              <div ref="infoDropdown" class="menu-profile-dropdown absolute bg-white p-3 right-0 min-w-[248px] z-10">
                <div class="menu-profile-item my-3 h-[1px] bg-neutral-02"></div>
                <div class="menu-profile-item flex gap-3 items-center px-4 py-3" @click="signOut">
                  <img src="@/assets/icons/log-out-icon-active.svg" alt="">
                  <span class="whitespace-nowrap">{{ $t("sign_out.log_out") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-content px-6 py-4 xl:px-12 xl:pt-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, reactive, computed } from "vue";
const router = useRouter();
const route = useRoute();
const store = useStore();
const showMenu = ref(false)
const userInfo = computed(() => {
  return store.state.authentication.userInfo;
});
const userProfile = computed(() => {
  return store.state.myProfile.userProfile;
});
const menuByRole = computed(() => {
  return menu.filter(item => item.active)
})
const currentRoute = computed(() => route.name)
const routeNames = {
  dashboard: "menu.dashboard",
  newUser: "menu.users",
  newCar: "menu.cars",
  myProfile: "profile.account_settings",
  editProfile: "profile.account_settings",
  changePassword: "profile.account_settings",
  companyMember: "menu.company_members",
  myApplication: "menu.users",
  cars: "menu.cars",
  detailCar: "menu.cars",
  detailUser: "menu.users",
}
const menu = reactive([
  {
    name: "menu.dashboard",
    iconActive: require("@/assets/icons/menu-active/dashboard-icon.svg"),
    iconInactive: require("@/assets/icons/menu-inactive/dashboard-icon.svg"),
    routerName: "dashboard",
    disable: false,
    active: true,
  },
  {
    name: "menu.users",
    iconActive: require("@/assets/icons/menu-active/my-application-icon.svg"),
    iconInactive: require("@/assets/icons/menu-inactive/my-application-icon.svg"),
    routerName: "User",
    disable: false,
    active: true,
  },
  {
    name: "menu.cars",
    iconActive: require("@/assets/icons/menu-active/temporary-icon.svg"),
    iconInactive: require("@/assets/icons/menu-inactive/temporary-icon.svg"),
    routerName: "cars",
    disable: false,
    active: true,
  },
  {
    name: "menu.bookings",
    iconActive: require("@/assets/icons/menu-active/setting-icon.svg"),
    iconInactive: require("@/assets/icons/menu-inactive/setting-icon.svg"),
    routerName: "Booking",
    disable: false,
    active: true,
  },
]);

const signOut = () => {
  store.commit("toggleLoading", true);
  store.dispatch("logOut").then(response => {
    router.push({ name: "getStarted" });
  }).finally(() => store.commit("toggleLoading", false))
};
const changeRoute = (routerName) => {
  router.push({ name: routerName })
};
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
<style lang="scss" scoped>
.page-header {
  height: 80px;
}

.page-content {
  height: calc(100% - 80px);
  overflow: auto;
}

.page-nav-bar {
  transition: all 0.3s ease-in-out;
  @apply bg-white top-0 bottom-0;
  z-index: 11;

  &.is-active {
    left: 0;
  }
}

.menu-overlay {
  background: rgba($color: #000000, $alpha: 0.5);
  transition: all 0.3s ease-in-out;
}

.account-profile {
  .menu-profile-dropdown {
    display: none;
  }

  &:hover {
    .menu-profile-dropdown {
      display: block;
    }
  }
}

.menu-profile-dropdown {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  top: 100%;
  transition: all .5s ease-in-out;

  .menu-profile-item {
    border-radius: 4px;
    transition: all .3s ease-in-out;
    cursor: pointer;

    &:hover {
      @apply bg-blue-background;
    }
  }
}

.bell-icon {
  @apply h-10 w-10 bg-[#f7f7f7] rounded-full flex items-center justify-center;

  &:hover {
    @apply bg-blue-background;
    animation: shake 0.5s ease-in-out infinite;
  }
}

@keyframes shake {
  0% {
    transform: rotate(30deg);
  }

  50% {
    transform: rotate(-30deg);
  }

  100% {
    transform: rotate(30deg);
  }
}
</style>
