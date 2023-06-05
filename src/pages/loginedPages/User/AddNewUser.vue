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
          {{ pageType === "new" ? "Add new User" : "Edit User" }}
        </p>
        <div class="grid grid-cols-4 gap-x-10">
          <div class="email-field mb-8 col-span-2">
            <p>{{ $t("user.tableDL.email") }}</p>
            <el-form-item prop="email">
              <el-input v-model="formData.email" />
            </el-form-item>
          </div>
          <div class="password-field mb-8 col-span-2" v-if="pageType === 'new'">
            <p>{{ $t("user.tableDL.password") }}</p>
            <el-form-item prop="password">
              <el-input v-model="formData.password" />
            </el-form-item>
          </div>
          <div class="first_name-field mb-8">
            <p>{{ $t("user.tableDL.first_name") }}</p>
            <el-form-item prop="firstName">
              <el-input v-model="formData.firstName" type="text" />
            </el-form-item>
          </div>
          <div class="last_name-field mb-8">
            <p>{{ $t("user.tableDL.last_name") }}</p>
            <el-form-item prop="lastName">
              <el-input v-model="formData.lastName" />
            </el-form-item>
          </div>
          <div class="dob-field mb-8">
            <p>{{ $t("user.tableDL.dob") }}</p>
            <el-form-item prop="dob">
              <el-date-picker
                v-model="formData.dob"
                style="{;width: 100%; height: 54px;}"
                type="date"
                placeholder="Pick a day"
                size="large"
              />
            </el-form-item>
          </div>
          <div class="country_code-field mb-8 col-start-1 col-span-1">
            <p>{{ $t("user.tableDL.country_code") }}</p>
            <el-form-item prop="phoneCountryCode">
              <el-input v-model="formData.phoneCountryCode" />
            </el-form-item>
          </div>
          <div class="phone-field mb-8 col-span-1">
            <p>{{ $t("user.tableDL.phone_number") }}</p>
            <el-form-item prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" />
            </el-form-item>
          </div>
          <div class="status-field mb-8 col-span-1">
            <p>{{ $t("user.tableDL.status") }}</p>

            <el-select v-model="formData.status">
              <el-option
                v-for="(option, index) in statusList.slice(1)"
                :key="index"
                :label="$t(option.label)"
                :value="option.value"
              ></el-option>
            </el-select>
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

const { store, statusList, route } = pageCompasable();
const pageType = route.query.pageType;
const { t } = useI18n();
const loading = ref(false);
const initialState = {
  email: "long.nt26008@gmail.com",
  password: "123123",
  firstName: "long",
  lastName: "thanh",
  dob: "2023-01-01",
  phoneNumber: "342899245",
  phoneCountryCode: "+84",
  userType: "CUSTOMER",
  status: "active",
};
const ruleFormRef = ref();
const formData = ref({ ...initialState });
const rules = reactive({
  name: [{ required: true }],
  email: [
    { required: true },
    {
      type: "email",
      message: "Please input correct email address",
    },
  ],
  firstName: [{ required: true }],
  lastName: [{ required: true }],
  password: [{ required: true }],
  dob: [{ required: true }],
  phoneNumber: [{ required: true }],
  phoneCountryCode: [{ required: true }],
  status: [{ required: true }],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    const dispatchStore = pageType === "edit" ? "editUser" : "addNewUser";
    if (valid) {
      loading.value = true;
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
const getInformationUser = (id) => {
  store
    .dispatch(`getDetailUser`, { id })
    .then((_) => {
      console.log(_);
      formData.value = {
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
  console.log(pageType);
  if (pageType === "edit") {
    const { id } = route.query;
    getInformationUser(id);
  }
});
</script>
