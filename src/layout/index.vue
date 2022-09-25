<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container class="container-box">
      <el-aside :style="tagStore.isShowSlider ? 'left:0px' : 'left:-200px'">
        <Slider />
      </el-aside>
      <el-main :style="{ marginLeft: tagStore.isShowSlider ? '200px' : '0' }">
        <RouteHistory />
        <div class="main-content-box">
          <router-view v-slot="{ Component, route }">
            <transition
              name="fade"
              mode="out-in"
              :duration="200">
              <keep-alive :include="keepAliveIncludes">
                <component :is="Component" :key="route.name" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts" name="layout-index">
import Header from './components/Header.vue';
import Slider from './components/Slider.vue';
import RouteHistory from './components/RouterHistory.vue';
import useTagStore from '@/store/tagsView';
import { storeToRefs } from 'pinia';

const tagStore = useTagStore();
const { keepAliveIncludes } = storeToRefs(tagStore);

// 初始化tab数据
tagStore.initSessionTabDatas();

</script>
<style lang="scss" scoped>
.el-header {
  padding: 0px;
}

.container-box {
  position: relative;
  height: calc(100vh - 60px);

  .el-aside {
    position: absolute;
    left: 0;
    height: 100%;
    background-color: #0e2045;
    width: 200px;
    transition: all 0.5s ease;
  }

  .el-main {
    padding: 0;
    position: relative;
    margin-left: 200px;
    transition: all 0.5s ease;

    .main-content-box {
      position: relative;
      height: calc(100% - 42px);
      overflow: hidden;
    }
  }
}
</style>
