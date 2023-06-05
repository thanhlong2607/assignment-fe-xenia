<template>
  <div class="sign-up-page flex flex-col items-center h-full">
    <div class="w-full max-w-[600px]">
      <div class="p-8">
        <div class="step-title text-neutral-08 font-bold text-[2.5rem] leading-[120%] mb-4">
          {{ $t("sign_in.log_in") }}
        </div>
        <div class="step-hint-text text-base text-neutral-05 mb-8">
          {{ $t("sign_in.login_title") }}
        </div>
        <div class="mb-4">
          <p class="text-sm font-medium text-neutral-08 pb-1">
            {{ $t("sign_in.email_address") }}
            <span class="text-reject">*</span>
          </p>
          <el-input v-model="account.email" maxlength="50" :placeholder="$t('sign_in.email_address_placeholder')"
            @keyup.enter.native="logIn"></el-input>
        </div>
        <div class="mb-6">
          <p class="text-sm font-medium text-neutral-08 pb-1">
            {{ $t("sign_in.password") }}
            <span class="text-reject">*</span>
          </p>
          <el-input v-model.trim="account.password" maxlength="50" type="password" show-password
            @keyup.enter.native="logIn"></el-input>
        </div>
        <div class="step-action mb-8">
          <el-button type="primary" class="w-full" :disabled="!account.email || !account.password" @click="logIn">{{
            $t("sign_in.sign_in") }}</el-button>
        </div>
     
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { Authentication } from "./composable";
import { ElMessage } from "element-plus";
const router = useRouter();
const { store } = Authentication();
const account = reactive({
  email: "admin@adamo.software",
  password: "123123123",
});
const logIn = () => {
  if (account.email && account.password) {
    store.commit("toggleLoading", true);
    store.dispatch("logIn", account).then(response => {
      if (!response.data.firstLogin && response.data.acceptTermAndConditional) {
        store.dispatch("getMyProfile").then(() => {
          router.push({ name: "dashboard" });
        }).catch(e => {
          ElMessage({
            message: e.response.data.message,
            type: "error",
          });
        })
      }
      else{
        router.push({ name: "dashboard" });
      }
    }).catch(e => {
      ElMessage({
        message: e.response.data.message,
        type: "error",
      });
    }).finally(() => store.commit("toggleLoading", false))
  }

};

</script>
<style lang="scss" scoped></style>
