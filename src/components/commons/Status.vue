<template>
  <div class="status-tag" >
    <div class="whitespace-nowrap" :class="item.status && item.status.toLowerCase()">
      {{ item.status }}
    </div>
  </div>
</template>
<script>
export default{
  props: ["item"],
}
</script>