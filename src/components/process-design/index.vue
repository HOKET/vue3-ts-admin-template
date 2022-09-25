<template>
  <vue-flow-editor :data="state.flowChartData" @add-node="handleAddNode" />
</template>

<script setup lang="ts">
import VueFlowEditor from './components/vue-flow-editor.vue';
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { FlowData, StepData, FormItemPermissionData } from './types';
import utils from '@/utils/utils';
const { ctx, proxy } = getCurrentInstance();

const state = reactive({
  // 编辑id
  id: 0,
  // 流程图数据（供初始化展示）
  flowChartData: null,
  // 当前节点配置
  nowGrapConfig: {},
  // 所有节点配置
  allConfig: {},
  // 表单设计数据
  optionsFormControls: []
});

// 初始化流程节点
const initFlowNode = () => {
  const startNode: FlowData = {
    id: 'node_' + utils.getRandomMs(),
    type: 'start',
    title: '开始节点',
    content: '',
    parentId: null
  };
  state.flowChartData = startNode;
  addNodeConfig(startNode);
};

// 新增节点配置
const addNodeConfig = (flowData: FlowData) => {
  const { id, type, title } = flowData;
  const obj: StepData = {
    stepId: id,
    stepType: type,
    title
  };
  obj.formPermissions = initFormPermissions(null, flowData.type);
  switch (flowData.type) {
    // 开始节点
    case 'start':
      obj.personal = { user: [] };
      break;
      // 审核节点
    case 'audit':
      obj.personal = { user: [] };
      break;
      // 抄送节点
    case 'forward':
      obj.personal = { user: [] };
      break;
      // 判断节点
    case 'judge':
      obj.conditions = [];
      break;
  }
  state.allConfig[id] = {
    stepData: obj,
    model: flowData
  };
};

// 新增节点
const handleAddNode = (data: FlowData) => {
  console.log('addNode', data);
};

/**
 * 初始化表单字段权限数据
 * @params data 服务端返回的字段权限数据
 * @params stepType 节点类型
 */
const initFormPermissions = (data: FormItemPermissionData[] | null, stepType: string): FormItemPermissionData[] => {
  const resultList:FormItemPermissionData[] = [];
  // 主表数据为undefined则设为空数组
  !data && (data = []);
  state.optionsFormControls.forEach((itemData:any) => {
    const formId = itemData.id;
    if (formId) {
      let tempData = null;
      const index = (data as FormItemPermissionData[]).findIndex(item => item.id === formId);
      if (index !== -1) {
        tempData = (data as FormItemPermissionData[])[index];
      } else {
        tempData = {
          id: formId,
          name: itemData.label,
          permission: 1
        };
      }
      resultList.push(tempData);
    }
  });
  return resultList;
};

onMounted(() => {
  // const editData = proxy.$parent.$data
  // // 无流程数据时，直接初始化
  // if (!editData?.id) {
  initFlowNode();
  // }
});
</script>
<style lang="scss" scoped>
</style>
