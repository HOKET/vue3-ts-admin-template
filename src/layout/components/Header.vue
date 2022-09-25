<template>
  <div class="header">
    <div class="header-title" @click="jumpToProList">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { reactive, toRefs } from 'vue';

const state = reactive<any>({
  title: 'XXX系统'
});
const jumpToProList = () => {
  router.push({ name: '/' });
};
const { title } = toRefs(state);
</script>
<style lang="scss" scoped>
.header{
  background: #05002e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .header-title {
    cursor: pointer;
    img{
      width: 40px;
      height: 40px;
    }
    p {
      margin-left: 10px;
      color: #fff;
    }
  }
  
}
</style>
