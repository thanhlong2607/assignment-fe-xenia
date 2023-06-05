<template>
  <div class="started-page flex w-full flex-col  lg:flex-row">
    <div class="w-full flex items-center justify-center py-20 lg:py-8">
      <div class="max-w-[80%] max-h-[80%]">
        <h2 class="text-[3rem] text-neutral-08 font-bold leading-[120%]">{{ $t("get_started.title") }}</h2>
        <div class="line h-0.5 bg-blue-main w-20 mt-14 mb-8"></div>
        <div class="mt-14">
          <el-button type="primary" class="warning-button" @click="router.push({name: 'signIn'})">
            {{ $t("get_started.get_started") }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<style lang="scss" scoped>
.started-page {
  min-height: calc(100vh - 80px);
}
</style>
