<template>
  <div class="" >
    <div class="grid grid-cols-3 place-items-center" :class="item.status && item.status.toLowerCase()">
      <div class="w-1/2 cursor-pointer" @click="handleAction('view')"><img src="@/assets/icons/view-icon.svg" alt=""></div>
      <div class="w-1/2 cursor-pointer" @click="handleAction('edit')"><img src="@/assets/icons/edit-icon.svg" alt=""></div>
      <div class="w-1/2 cursor-pointer" @click="handleAction('remove')"><img src="@/assets/icons/remove-icon.svg" alt=""></div>
    </div>
  </div>
</template>
<script>
export default{
  props: ["item"],
  methods: {
    handleAction(acName) {
      this.$emit('buttonEvent', {name: acName, item: this.item});
    }
  }
}
</script>