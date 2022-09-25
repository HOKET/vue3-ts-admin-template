<template>
  <div id="home">
    <process-design />
  </div>
</template>

<script setup lang="ts" name="home">
import processDesign from '@/components/process-design/index.vue';
import { reactive } from 'vue';
const state = reactive({});
</script>

<style scoped lang="scss">
#home {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
