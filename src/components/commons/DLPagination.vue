<template>
  <div class="w-full mt-6">
    <el-pagination v-if="props.total !== undefined" class="w-full flex justify-between" v-model:current-page="currentPage"
      v-model:page-size="pageSize" :page-sizes="props.pageSizes" :small="props.small" :disabled="props.disabled"
      :background="props.background" :pager-count="props.pagerCount" layout="sizes, prev, pager, next, jumper"
      :total="props.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default: () => [10, 25, 50, 100]
  },
  small: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  pagerCount: {
    type: Number,
    default: 5
  },
  total: {
    type: Number,
    default: 0
  }
})
const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)
const emits = defineEmits("perPageChange", "currentPageChange")
const handleSizeChange = (value) => {
  currentPage.value = 1;
  emits("perPageChange", value)
}
const handleCurrentChange = (value) => {
  emits("currentPageChange", value)
}

</script>