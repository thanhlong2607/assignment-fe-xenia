<template>
  <div class="flex gap-6 mt-2">
    <div class="w-full">
      <div class="application-block-info !mt-0">
        <div class="block-info-title">
          <span class="title">{{ $t("car.detail_title") }}</span>
        </div>
        <div class="line"></div>
        <div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("car.tableDL.name") }}:</label
            >
            <span class="info-value">{{ carData.name }}</span>
          </div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("car.tableDL.branch") }}:</label
            >
            <span class="info-value">{{ carData.branch }}</span>
          </div>
          <div class="info-line">
            <label class="info-label">{{ $t("car.tableDL.car_number") }}:</label>
            <span class="info-value">{{ carData.carNumber }}</span>
          </div>
          <div class="info-line">
            <label class="info-label">{{ $t("car.tableDL.price") }}:</label>
            <span class="info-value">{{ carData.price }} </span>
          </div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("car.tableDL.status") }}:</label
            >
            <span class="info-value">{{ carData.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import _ from "lodash";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { pageCompasable } from "@/pages/compasable";
const {  route, store, ElMessage } =
  pageCompasable();
const carData = ref({});
const getDetailApplication = () => {
  store.commit("toggleLoading", true);
  store
    .dispatch("getDetailCar", route.params.id)
    .then((response) => {
      carData.value = response.data;
    })
    .catch((e) => {
      ElMessage({
        message: e.response.data.message || t("notification.error.error"),
        type: "error",
      });
      return e;
    })
    .catch(() => {
      ElMessage({
        message: t("notification.error.error"),
        type: "error",
      });
    })
    .finally(() => store.commit("toggleLoading", false));
};
getDetailApplication();
</script>
<style lang="scss" scoped>
.application-block-info {
  @apply p-4 bg-neutral-01 border border-neutral-02 rounded mt-4;

  .block-info-title {
    @apply flex justify-between items-center mb-4;

    .title {
      @apply font-bold text-3xl text-neutral-08;
    }
  }

  .line {
    @apply h-0.5 bg-neutral-02 my-4;
  }

  .product-item {
    @apply bg-white border border-neutral-02 rounded p-4 mt-4 h-14 overflow-hidden;
    @apply text-neutral-08 text-base font-bold;
    transition: all 0.3s ease-in;

    .expand-icon {
      @apply cursor-pointer;
      transition: all 0.3s ease-in;
    }

    &.is-open {
      @apply text-blue-main h-full;

      .expand-icon {
        transform: rotate(180deg);
      }
    }
  }

  .relevant-item {
    @apply bg-white border border-neutral-02 rounded p-4 mt-4;
  }
}

.info-line {
  @apply grid grid-cols-2 my-4;
}

.info-label {
  @apply text-title text-neutral-05 max-w-[50%];
}

.info-value {
  @apply text-title text-neutral-08 max-w-[50%];
}
</style>
