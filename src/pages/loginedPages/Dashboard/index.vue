<template>
  <div class="h-full">
    <div >
      <DashboardPage ></DashboardPage>
    </div>
  </div>
</template>
<script setup>
import { dashboardCompasable } from "./compasable.js";
import DashboardPage from "./DashboardPage.vue";
const { userInfo } = dashboardCompasable();
</script>
<style lang="scss" scoped></style>
