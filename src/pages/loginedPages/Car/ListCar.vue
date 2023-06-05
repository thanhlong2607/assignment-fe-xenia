<template>
  <div>
    <div class="main-content">
      <div class="main-title flex justify-between items-center mb-4">
        <div class="flex gap-4">
          <el-button
            type="primary"
            style="background-color: rgb(255, 0, 204) !important; "
            @click="
              router.push({
                name: 'newCar',
                query: { pageType: 'new' },
              })
            "
          >
            <img src="@/assets/icons/new-icon.svg" alt="" />
            <span>{{ $t("car.new_car") }}</span>
          </el-button>
        </div>
      </div>
      <div class="action-bar flex justify-between p-2 bg-white mb-2">
        <div class="flex items-center gap-4">
          <el-input
            v-model="filterOption.searchKey"
            @keyup.enter="searchCar"
            @input="handleSearchChange"
            placeholder="Search by Car number"
          >
            <template #append>
              <img
                class="cursor-pointer"
                src="@/assets/icons/search-icon.svg"
                alt=""
                @click="searchCar"
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
            :table-data="userList"
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
import EditARemove from "@/components/commons/EditARemove.vue";
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

const userList = ref([]);
const headers = [
  {
    value: "name",
    label: "car.tableDL.name",
  },
  {
    value: "branch",
    label: "car.tableDL.branch",
  },
  {
    value: "carNumber",
    label: "car.tableDL.car_number",
  },
  {
    value: "price",
    label: "car.tableDL.price",
  },
  {
    value: "status",
    label: "car.tableDL.status",
  }, {
    value: "createdAt",
    label: "car.tableDL.created_at",
  }
];
const customColumn = {
  component: EditARemove,
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
    .dispatch("getListCar", params)
    .then((response) => {
      paginationConfig.total = response.data.totalRecord;
      if (response.data) {
        userList.value = response.data.map((el) => {
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
const searchCar = () => {
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
const selectCar = (row) => {
  router.push({
    name: "detailCar",
    params: { id: row.id },
  });
};
const eventFunc = (e) => {
  if (e.name === "view") {
    selectCar(e.item);
  } else if (e.name === "edit") {
    router.push({
      name: "newCar",
      query: { pageType: "edit", id: e.item.id },
    });
  } else if (e.name === "remove") {
    ElMessageBox.confirm("Are you sure to remove this one?")
      .then(() => {
        store.dispatch("removeCar", e.item.id);
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
