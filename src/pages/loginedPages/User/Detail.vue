<template>
  <div class="flex gap-6 mt-2">
    <div class="w-full">
      <div class="application-block-info !mt-0">
        <div class="block-info-title">
          <span class="title">{{ $t("user.detail_title") }}</span>
        </div>
        <div class="line"></div>
        <div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("user.tableDL.first_name") }}:</label
            >
            <span class="info-value">{{ userData.firstName }}</span>
          </div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("user.tableDL.last_name") }}:</label
            >
            <span class="info-value">{{ userData.lastName }}</span>
          </div>
          <div class="info-line">
            <label class="info-label">{{ $t("user.tableDL.dob") }}:</label>
            <span class="info-value">{{ userData.dob }}</span>
          </div>
          <div class="info-line">
            <label class="info-label">{{ $t("user.tableDL.email") }}:</label>
            <span class="info-value">{{ userData.email }} </span>
          </div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("user.tableDL.country_code") }}:</label
            >
            <span class="info-value">{{ userData.phoneCountryCode }}</span>
          </div>
          <div class="info-line">
            <label class="info-label"
              >{{ $t("user.tableDL.phone_number") }}:</label
            >
            <span class="info-value">{{ userData.phoneNumber }}</span>
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
const { router, route, store, ElMessage, Roles, userProfile } =
  pageCompasable();
const userData = ref({});
const getDetailApplication = () => {
  store.commit("toggleLoading", true);
  store
    .dispatch("getDetailUser", route.params.id)
    .then((response) => {
      userData.value = response.data;
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
