<template>
  <div>
    <div class="main-content">
      <div class="main-title flex justify-between items-center mb-4">
        <div class="flex gap-4">
          <el-button
            type="primary"
            style="background-color: rgb(0, 255, 157) !important"
            @click="
              router.push({
                name: 'newBooking',
                query: { pageType: 'new' },
              })
            "
          >
            <img src="@/assets/icons/new-icon.svg" alt="" />
            <span>{{ $t("booking.new_booking") }}</span>
          </el-button>
        </div>
      </div>
      <div class="action-bar flex justify-between p-2 bg-white mb-2">
        <div class="flex items-center gap-4">
          <el-input
            v-model="filterOption.searchKey"
            @keyup.enter="searchBooking"
            @input="handleSearchChange"
            placeholder="Search by Reference"
          >
            <template #append>
              <img
                class="cursor-pointer"
                src="@/assets/icons/search-icon.svg"
                alt=""
                @click="searchBooking"
              />
            </template>
          </el-input>
          <div class="bg-neutral-03 flex gap-2 items-center py-2 px-3">
            <span class="text-sm font-bold text-neutral-07"
              >{{ $t("common.status") }}:
            </span>
            <el-select
              clearable
              v-model="filterOption.status"
              @change="filterApplication"
            >
              <el-option
                v-for="(option, index) in statusList"
                :key="'status' + index"
                :label="$t(option.label)"
                :value="option.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div>
          <DLTable
            :table-data="bookingList"
            :headers="headers"
            :customColumn="customColumn"
            @event="eventFunc"
          ></DLTable>
          <DLPagination
            :currentPage="paginationConfig.currentPage"
            :total="paginationConfig.total"
            :pageSize="paginationConfig.perPage"
            @perPageChange="perPageChange"
            @currentPageChange="currentPageChange"
          >
          </DLPagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import _ from "lodash";
import DLTable from "@/components/commons/DLTable.vue";
import DLPagination from "@/components/commons/DLPagination.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import RejectAApproval from "@/components/commons/RejectAApproval.vue";
import { pageCompasable } from "@/pages/compasable";
const { router, store, STATUS, statusList } = pageCompasable();
const filterOption = reactive({
  targetApplication: "food",
  status: "",
  searchKey: "",
});
const paginationConfig = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const handleSearchChange = _.debounce(function () {
  if (!filterOption.searchKey) {
    getListCar();
  }
}, 2000);

const bookingList = ref([]);
const headers = [
  {
    value: "referenceNo",
    label: "booking.tableDL.reference_no",
  },
  {
    value: "requestStartAt",
    label: "booking.tableDL.request_start_at",
  },
  {
    value: "requestEndAt",
    label: "booking.tableDL.request_end_at",
  },
  {
    value: "pricePerDay",
    label: "booking.tableDL.pricePerDay",
  },
  {
    value: "totalPrice",
    label: "booking.tableDL.totalPrice",
  },
  {
    value: "status",
    label: "booking.tableDL.status",
  },
  {
    value: "createdAt",
    label: "booking.tableDL.created_at",
  },
  {
    value: "car.name",
    label: "booking.tableDL.car",
  },
  {
    value: "user.email",
    label: "booking.tableDL.user",
  },
];
const customColumn = {
  component: RejectAApproval,
  label: "",
  value: "",
};

const getListCar = () => {
  const params = {
    limit: paginationConfig.pageSize,
    offset: (paginationConfig.currentPage - 1) * paginationConfig.pageSize,
    email: filterOption.searchKey.trim(),
    status: filterOption.status,
  };
  console.log(params);
  store.commit("toggleLoading", true);
  store
    .dispatch("getListBooking", params)
    .then((response) => {
      paginationConfig.total = response.data.totalRecord;
      if (response.data) {
        bookingList.value = response.data.map((el) => {
          el.status = el.status;
          return el;
        });
      }
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
getListCar();
const searchBooking = () => {
  paginationConfig.currentPage = 1;
  getListCar();
};
const filterApplication = () => {
  paginationConfig.currentPage = 1;
  getListCar();
};
const perPageChange = (perPage) => {
  paginationConfig.pageSize = perPage;
  paginationConfig.currentPage = 1;
  getListCar();
};
const currentPageChange = (currentPage) => {
  paginationConfig.currentPage = currentPage;
  getListCar();
};

const eventFunc = (e) => {
  if (["approval", "reject"].includes(e.name)) {
    ElMessageBox.confirm("Are you sure to remove this one?")
      .then(() => {
        store.dispatch("updateBookingStatus", { status: e.name});
      })
      .catch(() => {});
  } 
};
</script>
<style lang="scss" scoped>
.main-content {
  @apply mb-8;
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
</style>
