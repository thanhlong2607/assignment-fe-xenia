<template>
  <div class="dashboard-page pb-6">
    <div class="main-content">
      <div class="flex justify-center items-center gap-6">
        <div
          v-for="(item, index) in [1, 2, 3]"
          :key="index"
          class="content-instraction"
        >
          <div class="instraction-item">
            <div class="instraction-item--icon">
              <img src="@/assets/icons/earth-icon.svg" alt="" />
            </div>
            <div class="instraction-item--title">User, Car, Booking Title</div>
            <div class="instraction-item--content">
              3. Local components: Avoid creating local components when
              possible.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.dashboard-page {
  .main-content {
    @apply mb-8;
  }

  .main-title {
    @apply text-neutral-08 mb-5;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 150%;
  }

  .content-instraction {
    @apply p-4 bg-white rounded;

    .instraction-item {
      @apply flex flex-col gap-2;

      &--title {
        @apply font-bold text-base text-neutral-08;
      }

      &--content {
        @apply font-normal text-xs text-neutral-07;
      }
    }
  }

  .target-application {
    @apply flex gap-2 text-sm items-center cursor-pointer text-neutral-04;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 0.3s ease-in-out;

    .target-active {
      display: none;
    }

    .target-inactive {
      display: block;
    }

    &.is-active,
    &:hover {
      @apply bg-blue-background text-blue-main;

      .target-active {
        display: block;
      }

      .target-inactive {
        display: none;
      }
    }
  }
}
</style>
