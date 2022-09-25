import { defineStore } from 'pinia';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import storage from '@/utils/storage';
import { ElMessage } from 'element-plus';

interface TabItemData {
	name: string; // 路由名 route.name
	title: string; // 路由设的页面标题 route.meta.title
}

interface TabsViewState {
	isShowSlider: boolean;
	tabList: TabItemData[];
	activeTab: string;
	keepAliveIncludes: string[]; // 存的是组件的名字
	noKeepAliveComponentName: string[]; // 存的是组件的名字
}

const useTagsViewStore = defineStore('tagsView', {
  state: (): TabsViewState => {
    return {
      isShowSlider: true,
      tabList: [],
      activeTab: '', // 值为 name
      keepAliveIncludes: [], // 缓存列表
      noKeepAliveComponentName: [] // 不缓存列表
    };
  },
  actions: {
    setSliderStatus (boolean: boolean) {
      this.isShowSlider = boolean;
    },
    // 初始化session中的tab数据
    initSessionTabDatas () {
      const lists = storage.get('tab_list') || [];
      const active = storage.get('tab_active') || '';
      this.tabList = lists;
      this.activeTab = active;
    },

    // 设置当前选中的tab
    setActiveTab (name: string) {
      this.activeTab = name;
      storage.set('tab_active', name);
    },

    // 新增tab
    addTab (data: RouteLocationNormalizedLoaded) {
      const { name, meta } = data;
      const index = this.tabList.findIndex((item) => item.name === name);
      if (index === -1) {
        this.tabList.push(<TabItemData>{ name, title: meta?.title });
        storage.set('tab_list', this.tabList);
      }
    },

    // 删除tab
    removeTab (data: any) {
      const len = this.tabList.length;
      // 仅剩一个禁止删除
      if (len === 1) return;
      const index = this.tabList.findIndex((item) => item.name === data.name);
      let newIdx = index;
      let newActive = '';
      // 设置新的tab
      if (this.activeTab === data.name) {
        newIdx = index === 0 && len > 1 ? 1 : index - 1;
        newActive = this.tabList[newIdx].name;
      }
      this.setActiveTab(this.tabList[newIdx].name);
      data.callback && data.callback(newActive);

      // 删除tab数据
      this.tabList.splice(index, 1);
      // 删除缓存组件回调
      data.delKeepAliveCallback && data.delKeepAliveCallback();
      storage.set('tab_list', this.tabList);
    },

    // 获取当前路由对应的组件name属性并添加缓存
    addKeepAliveCache (route: RouteLocationNormalizedLoaded) {
      if (route.meta.noCache) return;
      // 根据路由属性获取对应的组件name
      const len = route.matched.length || 0;
      const componentsName =
				len > 0 ? route.matched[len - 1]?.components?.default.name : '';
      // 当获取的组件name为空时，报警提示开发人员
      if (!componentsName) {
        ElMessage.error('当前组件没有设置name属性，开发人员需设置其值');
        return;
      }
      // 判断组件是否在不缓存名单中
      const noTempIndex = this.noKeepAliveComponentName.indexOf(componentsName);
      // 判断是否需要缓存组件name
      const index = this.keepAliveIncludes.indexOf(componentsName);
      if (noTempIndex === -1 && index === -1) {
        this.keepAliveIncludes.push(componentsName);
      }
    },

    // 删除缓存
    removeKeepAliveCache (name: string) {
      // 删除已缓存组件name
      const index = this.keepAliveIncludes.indexOf(name);
      if (index !== -1) {
        this.keepAliveIncludes.splice(index, 1);
      }
    }
  }
});

export default useTagsViewStore;
