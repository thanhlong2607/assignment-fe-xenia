<template>
  <div ref="documentContainer"
    class="document-container fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-[999]"
    @click="closeViewDocument">
    <div ref="documentContent" class="w-4/5 h-4/5 flex items-center justify-center" @click="closeViewDocument">
      <PDFViewer v-if="store.state.documentInfo.type === 'application/pdf'" :source="url"
        :controls="['download', 'rotate', 'zoom', 'catalog', 'switchPage']" style="height: 100%; width: 100%"
        @download="handleDownload" />
      <img v-else class="max-h-full" :src="url" alt="" />
    </div>
  </div>
</template>
<script setup>
import PDFViewer from "pdf-viewer-vue";
import { ref } from "vue"
import { useStore } from "vuex";
const store = useStore();
const serverUrl = process.env.VUE_APP_API;
const documentContainer = ref(null)
const documentContent = ref(null)
const url = store.state.documentInfo.preview ? store.state.documentInfo.source : `${serverUrl}/api/file/get/${store.state.documentInfo.source}`
const handleDownload = (data) => {
};
const closeViewDocument = (e) => {
  if (e.target === documentContainer.value || e.target === documentContent.value) {
    store.commit("toggleShowDocument", false)
  }
}
</script>
<style lang="scss" scoped>
.document-container {
  background-color: rgba($color: #000000, $alpha: 0.6);
}
</style>
