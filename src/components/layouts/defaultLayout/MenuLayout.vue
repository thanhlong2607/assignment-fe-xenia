<template>
  <div class="menu-list flex items-center gap-11 h-11">
    <div class="menu-item text-neutral-08">FAQs</div>
    <div class="menu-item text-neutral-08">Contact Us</div>
    <div class="vertical-line h-full w-[1px] bg-neutral-02"></div>
    <div class="menu-item text-neutral-08 flex">
      <el-dropdown>
        <span class="text-neutral-08 outline-none">
          {{ $t("language") }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :class="
                store.state.language.currentLanguage === 'english' &&
                'is-active'
              "
              @click="changeLanguage('english')"
              >English</el-dropdown-item
            >
            <el-dropdown-item
              :class="
                store.state.language.currentLanguage !== 'english' &&
                'is-active'
              "
              @click="changeLanguage('malay')"
              >Malaysia</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div
      v-if="route.name !== 'signIn'"
      class="menu-item text-neutral-08"
      @click="redirectTo('signIn')"
    >
      {{ $t("sign_in.log_in") }}
    </div>
    <div
      v-if="route.name !== 'signUp'"
      class="menu-item text-neutral-08"
      @click="redirectTo('signUp')"
    >
      <el-button type="primary" class="warning-button text-sm h-full !px-4 !py-3"
        >{{ $t("get_started.get_started") }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
const redirectTo = (name) => {
  router.push({ name: name });
};
const changeLanguage = (value) => {
  store.commit("changeLanguge", value);
};
</script>
<style lang="scss" scoped>
.menu-item {
  font-size: 0.875rem;
  cursor: pointer;
}
</style>
