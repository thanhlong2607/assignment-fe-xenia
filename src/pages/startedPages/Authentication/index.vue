<template>
  <div class="authentication-page flex h-full py-10">
    <div class="left-panel flex gap-4">
      <div class="flex flex-col gap-4">
        <img
          class="min-w-[45px] w-[45px]"
          src="@/assets/images/image-default-2.png"
          alt=""
        />
        <img
          class="min-w-[45px] w-[45px]"
          src="@/assets/images/image-default-1.png"
          alt=""
        />
      </div>
      <div class="flex flex-col gap-4">
        <img
          class="min-w-[193px] w-[193px]"
          src="@/assets/images/image-default-4.png"
          alt=""
        />
        <img
          class="min-w-[193px] w-[193px]"
          src="@/assets/images/image-default-5.png"
          alt=""
        />
      </div>
    </div>
    <div class="main-content grow">
      <router-view />
    </div>
    <div class="right-panel flex items-end">
      <div class="w-full flex flex-col gap-4">
        <img
          class="min-w-[254px] w-[254px]"
          src="@/assets/images/image-default-3.png"
          alt=""
        />
        <img
          class="min-w-[254px] w-[254px]"
          src="@/assets/images/image-default-6.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
