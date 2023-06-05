<template>
  <div class="bg-white rounded p-6">
    <el-form
      ref="ruleFormRef"
      :model="formData"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <section class="contact-form">
        <p class="text-title mb-8">
          {{ pageType === "new" ? "Add new Booking" : "Edit Booking" }}
        </p>
        <div class="grid grid-cols-4 gap-x-10">
          <div class="year-field mb-8 col-span-2">
            <p>{{ $t("booking.tableDL.dateRange") }}</p>
            <el-form-item prop="dateRange">
              <el-date-picker
                style="
                   {
                    width: 100%;
                    height: 54px;
                  }
                "
                v-model="formData.dateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                size="large"
              />
            </el-form-item>
          </div>
          <div class="user-field mb-8">
            <p>{{ $t("booking.tableDL.user") }}</p>
            <el-select v-model="formData.userId">
              <el-option
                v-for="(user, index) in userList"
                :key="index"
                :label="user.email"
                :value="user.id"
              ></el-option>
            </el-select>
          </div>
          <div class="user-field mb-8">
            <p>{{ $t("booking.tableDL.user") }}</p>
            <el-select v-model="formData.carId">
              <el-option
                v-for="(car, index) in carList"
                :key="index"
                :label="`${car.carNumber} - ${car.name}`"
                :value="car.id"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="flex gap-4">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            :loading="loading"
            >{{ $t("common.create") }}</el-button
          >
        </div>
      </section>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref, defineProps, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { pageCompasable } from "@/pages/compasable.js";
import { ElMessage } from "element-plus";

const { store, route, STATUS } = pageCompasable();
const pageType = route.query.pageType;
const { t } = useI18n();
const loading = ref(false);
const initialState = {
  requestStartAt: null,
  requestEndAt: null,
  dateRange: null,
  carId: null,
  userId: null,
};
const ruleFormRef = ref();
const userList = ref();
const carList = ref();
const formData = ref({ ...initialState });
const rules = reactive({
  carId: [{ required: true }],
  userId: [{ required: true }],
  dateRange: [{ required: true }],
});
const submitForm = async (formEl) => {
  if (!formData.value.requestEndAt || !formData.value.requestStartAt) {
    ElMessage({
      message: t("common.validate_failed"),
      type: "error",
    });
    return;
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    const dispatchStore = pageType === "edit" ? "editCar" : "addNewCar";
    if (valid) {
      loading.value = true;
      formData.value.requestStartAt = formData.value.dateRange[0];
      formData.value.requestEndAt = formData.value.dateRange[1];
      console.log(formData.value);
      store
        .dispatch(`${dispatchStore}`, formData.value)
        .then((_) => {
          formEl.resetFields();
          loading.value = false;
          ElMessage({
            message: t("common.success"),
            type: "success",
          });
        })
        .catch((err) => {
          loading.value = false;
          ElMessage({
            message: t("common.failed"),
            type: "error",
          });
        });
    }
  });
};

const getListUser = () => {
  store
    .dispatch("getListUser", { status: STATUS.active })
    .then((_) => {
      userList.value = {
        ..._.data,
      };
    })
    .catch((err) => {
      ElMessage({
        message: err,
        type: "error",
      });
    });
};
const getListCar = () => {
  store
    .dispatch("getListCar", { status: STATUS.active })
    .then((_) => {
      carList.value = {
        ..._.data,
      };
    })
    .catch((err) => {
      ElMessage({
        message: err,
        type: "error",
      });
    });
};
onMounted(() => {
  getListUser();
  getListCar();
});
</script>
