<template>
  <div class="admin-slider">
    <el-menu
      background-color="#0e2045"
      text-color="#fff"
      active-text-color="#163473"
      menu-trigger="click"
      :default-active="defaultActive"
      unique-opened
      router>
      <template v-for="navMenu in tabRoutes">
        <!-- 有子页面的菜单 -->
        <template v-if="navMenu.children && navMenu.children.length > 0">
          <el-sub-menu :key="navMenu.path" :index="navMenu.path">
            <template #title>
              <i class="el-icon-location" />
              <span v-if="navMenu.meta"> {{ navMenu.meta.title }}</span>
            </template>

            <template v-for="navItem in navMenu.children" :key="navItem.path">
              <template v-if="navItem.meta && !navItem.meta.noCache">
                <el-menu-item :index="navMenu.path + '/' + navItem.path">
                  <span>{{ navItem.meta.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
        <!-- 单页面 -->
        <template v-else-if="navMenu.meta">
          <el-menu-item :key="navMenu.path" :index="navMenu.path">
            {{ navMenu.meta.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import tabRoutes from '@/utils/allRoutes';
import { useRoute } from 'vue-router';
const route = useRoute();

const defaultActive = ref(route.fullPath);
watch(
  () => route.path,
  () => {
    // 保证点击tab时，侧边栏跟着更新
    defaultActive.value = route.fullPath;
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.admin-slider {
  .el-menu {
    border-right: 0;

    .el-menu-item {
      &.is-active {
        color: #ffffff;
        background: #3270DB;
      }
    }
  }
}
</style>
