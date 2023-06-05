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
          {{ pageType === "new" ? "Add new Car" : "Edit Car" }}
        </p>
        <div class="grid grid-cols-4 gap-x-10">
          <div class="name-field mb-8">
            <p>{{ $t("car.tableDL.name") }}</p>
            <el-form-item prop="name">
              <el-input v-model="formData.name" />
            </el-form-item>
          </div>
          <div class="branch-field mb-8">
            <p>{{ $t("car.tableDL.branch") }}</p>
            <el-form-item prop="branch">
              <el-input v-model="formData.branch" />
            </el-form-item>
          </div>
          <div class="build-field mb-8">
            <p>{{ $t("car.tableDL.build") }}</p>
            <el-form-item prop="build">
              <el-input v-model="formData.build" type="text" />
            </el-form-item>
          </div>
          <div class="year-field mb-8">
            <p>{{ $t("car.tableDL.year") }}</p>
            <el-form-item prop="year">
              <el-date-picker
                style="
                   {
                    width: 100%;
                    height: 54px;
                  }
                "
                v-model="formData.year"
                type="year"
                placeholder="Pick a day"
                size="large"
              />
            </el-form-item>
          </div>
          <div class="mode-field mb-8">
            <p>{{ $t("car.tableDL.mode") }}</p>
            <el-form-item prop="mode">
              <el-input v-model="formData.mode" />
            </el-form-item>
          </div>
          <div class="price-field mb-8">
            <p>{{ $t("car.tableDL.price") }}</p>
            <el-form-item prop="price">
              <el-input v-model="formData.price" type="number" />
            </el-form-item>
          </div>
          <div class="address-field mb-8">
            <p>{{ $t("car.tableDL.address") }}</p>
            <el-form-item prop="address">
              <el-input v-model="formData.address" />
            </el-form-item>
          </div>
          <div class="carNumber-field mb-8">
            <p>{{ $t("car.tableDL.car_number") }}</p>
            <el-form-item prop="carNumber">
              <el-input v-model="formData.carNumber" />
            </el-form-item>
          </div>
          <div class="user-field mb-8">
            <p>{{ $t("car.tableDL.user") }}</p>

            <el-select v-model="userId">
              <el-option
                v-for="(user, index) in userList"
                :key="index"
                :label="user.email"
                :value="user.id"
              ></el-option>
            </el-select>
          </div>
          <div class="status-field mb-8">
            <p>{{ $t("car.tableDL.status") }}</p>

            <el-select v-model="formData.status">
              <el-option
                v-for="(option, index) in statusList.slice(1)"
                :key="index"
                :label="$t(option.label)"
                :value="option.value"
              ></el-option>
            </el-select>
          </div>
          <div class="carNumber-field mb-8 col-start-1">
            <p>{{ $t("car.tableDL.is_feature") }} (High priority listing)</p>
            <el-form-item prop="isFeature">
              <el-checkbox v-model="formData.isFeature" size="large" />
            </el-form-item>
          </div>
        </div>

        <div class="flex gap-4">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            :loading="loading"
            >{{ $t("common.save") }}</el-button
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

const { store, statusList, route, STATUS } = pageCompasable();
const pageType = route.query.pageType;
const { t } = useI18n();
const loading = ref(false);
const initialState = {
  id: 1,
  name: "",
  branch: "",
  build: "",
  mode: "",
  carNumber: "",
  isFeature: true,
  price: 2,
  address: "",
  status: "",
  year: "2012",
  userId: 1,
  createdAt: "2023-06-02 04:12:41.515372+00",
};
const ruleFormRef = ref();
const userId = ref();
const userList = ref();
const formData = ref({ ...initialState });
const rules = reactive({
  name: [{ required: true }],
  branch: [{ required: true }],
  build: [{ required: true }],
  mode: [{ required: true }],
  carNumber: [{ required: true }],
  price: [{ required: true }],
  address: [{ required: true }],
  year: [{ required: true }],
  status: [{ required: true }],
});
const submitForm = async (formEl) => {
  if (!userId.value) {
    ElMessage({
      message: t("common.failed"),
      type: "error",
    });
    return;
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    const dispatchStore = pageType === "edit" ? "editCar" : "addNewCar";
    if (valid) {
      loading.value = true;
      formData.value.userId = userId.value;
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
const getInformationCar = (id) => {
  store
    .dispatch(`getDetailCar`, { id })
    .then((_) => {
      formData.value = {
        ..._.data,
      };
      userId.value = _.data.userId
    })
    .catch((err) => {
      ElMessage({
        message: err,
        type: "error",
      });
    });
};
const getListUser = (id) => {
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
onMounted(() => {
  if (pageType === "edit") {
    const { id } = route.query;
    getInformationCar(id);
  }
  getListUser();
});
</script>
