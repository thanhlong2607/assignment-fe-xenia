<template>
  <router-view />
  <DocumentViewer v-if="store.state.showDocument"></DocumentViewer>
  <Loading v-if="store.state.loading"></Loading>
</template>
<script setup>
import DocumentViewer from "./components/commons/DocumentViewer.vue";
import Loading from "./components/commons/Loading.vue"
import { useStore } from "vuex";
const store = useStore();
store.commit("toggleLoading", false);
</script>
<style lang="scss"></style>
