<template>
  <div class="">
    <div
      class="grid grid-cols-2 place-items-center"
      :class="item.status && item.status.toLowerCase()"
    >
      <div class="w-1/3 text-center cursor-pointer" @click="handleAction('approval')">
        <img src="@/assets/icons/done-icon.svg" alt="" />
      </div>
      <div class="w-full text-center cursor-pointer" @click="handleAction('reject')">
        <img src="@/assets/icons/remove-icon.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    handleAction(acName) {
      this.$emit("buttonEvent", { name: acName, item: this.item });
    },
  },
};
</script>
