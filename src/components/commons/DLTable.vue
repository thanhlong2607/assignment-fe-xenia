<template>
  <el-table :data="props.tableData" table-layout="auto" style="width: 100%" @row-click="handleRowClick">
    <el-table-column v-for="(header, index) in props.headers" :key="'table-column' + index" :prop="header.value"
      :label="$t(header.label)" />
    <el-table-column :prop="customColumn.value" :label="$t(customColumn.label)">
      <template #default="scope">
        <component :is="customColumn.component" :item="scope.row" @buttonEvent="buttonEvent">
        </component>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
const props = defineProps(["tableData", "headers", "customColumn", "minWidth"])
const emits = defineEmits(["rowClick", "event"])
const handleRowClick = (row, column, event) => {
  emits("rowClick", row);
}
const buttonEvent = (payload) => {
  emits("event", payload)
}
</script>