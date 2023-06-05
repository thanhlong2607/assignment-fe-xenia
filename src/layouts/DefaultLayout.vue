<template>
  <div class="default-page">
    <div class="default-page--header flex justify-between items-center p-4">
      <img src="@/assets/images/defaultPageLogo.png" alt="" @click="router.push({name: 'getStarted'})"/>
      <MenuLayout></MenuLayout>
    </div>
    <div class="default-page--body overflow-auto">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import MenuLayout from "@/components/layouts/defaultLayout/MenuLayout.vue";
import { useRouter } from "vue-router";
const router = useRouter()
</script>
<style lang="scss" scoped>
.default-page--body {
  height: calc(100vh - 80px);
}
</style>
