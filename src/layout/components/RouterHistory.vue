<template>
  <div class="historyList">
    <div class="menu-fold" @click="handleFoldMenu">
      <el-icon>
        <Fold v-if="isShowSlider" />
        <Expand v-else />
      </el-icon>
    </div>
    <el-tabs
      v-if="tabList.length > 0"
      v-model="activeTab"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="tabList.length > 1" />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { unref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useTagStore from '@/store/tagsView';
import { storeToRefs } from 'pinia';
const router = useRouter();
const route = useRoute();
const tagStore = useTagStore();
// 初始化tab数据
tagStore.initSessionTabDatas();

const { isShowSlider, activeTab, tabList } = storeToRefs(tagStore);
// 折叠菜单
const handleFoldMenu = () => {
  tagStore.setSliderStatus(!tagStore.isShowSlider);
};

watch(
  () => route.name,
  (newVal, oldVal) => {
    if (!route.meta.noCache) {
      tagStore.addKeepAliveCache(route);
      tagStore.addTab(route);
      tagStore.setActiveTab(route.name as string);
    }
  },
  { immediate: true }
);

// 点击tab
const handleTabClick = (tabData: any) => {
  const { props } = tabData;
  const { name } = props;
  if (unref(activeTab) === name) return;
  tagStore.setActiveTab(name);
  router.push({ name });
};

// 删除tab
const handleTabRemove = (name: any) => {
  const data = {
    name,
    callback: (newName: string) => {
      router.push({ name: newName });
    },
    delKeepAliveCallback: () => {
      // 删除已缓存组件name
      tagStore.removeKeepAliveCache(name);
    }
  };
  tagStore.removeTab(data);
};
</script>

<style lang="scss" scoped>
.historyList {
  border-bottom: 1px solid #e8e8e8;
  background: #ffffff;
  box-shadow: 2px 0px 10px 0px rgba(67, 133, 245, 0.15);
  border-radius: 2px;
  display: flex;
}

.menu-fold {
  cursor: pointer;
  border-right: 1px solid #ccc;
  padding: 12px;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
}

.el-tabs {
  width: calc(100% - 40px);

  :deep(.el-tabs__header) {
    margin: 0;
  }
}
</style>
