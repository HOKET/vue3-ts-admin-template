<template>
  <div class="flow-container">
    <!-- <div class="scale-slider"></div> -->
    <div style="display: inline-flex; flex-direction: column; align-items: center; transform: scale(1)">
      <template v-if="data && data.id">
        <node-wrap ref="nodeWrapRef" :data="data">
          <template #button-popover>
            <div class="condition-box">
              <div>
                <div class="condition-icon" @click="handleAddNode('audit')">
                  <i class="iconfont icon-audit" />
                </div>
                <span>审批人</span>
              </div>
              <div>
                <div class="condition-icon" @click="handleAddNode('forward')">
                  <i class="iconfont icon-forward" />
                </div>
                <span>抄送人</span>
              </div>
            </div>
          </template>
        </node-wrap>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import NodeWrap from './node-wrap.vue';
import { reactive, toRefs, ref } from 'vue';
import { FlowData } from './types';
import Utils from '@/utils/utils';
interface DataProps {
  data: FlowData
}
const emit = defineEmits<{
  (e: 'add-node', data: FlowData): void
  (e: 'del-node', data: FlowData): void
}>();

const props = withDefaults(defineProps<DataProps>(), {
  data: () => {
    return {
      id: 'node_' + Utils.getRandomMs(),
      type: 'start',
      title: '开始节点',
      content: '',
      parentId: null
    };
  }
});

const nodeWrapRef = ref<any>(null);
// 新增节点
const handleAddNode = (type: string): void => {
  console.log(111, type);
  console.log(nodeWrapRef.value.hidePopover());
  // const { id: parentId, childNode } = nodeData;
  // const id = 'node_' + Utils.getRandomMs();
  // const obj: FlowData = {
  //     id,
  //     type,
  //     parentId,
  //     content: '内容',
  //     title: id
  // };
  // // if (type === 'audit') {
  // //   obj.title = '审核节点'
  // // } else if (type === 'forward') {
  // //   obj.title = '抄送节点'
  // // }
  // if (!childNode) {
  //     nodeData.childNode = obj;
  // } else {
  //     obj.childNode = childNode;
  //     childNode.parentId = obj.id;
  //     nodeData.childNode = obj;
  // }
  // emit('add-node', obj);
};

// 删除节点
const handleDeleteNode = (nodeData: FlowData): void => {
  const { id, type, parentId } = nodeData;
  console.log('delNode', id, type);
  const parentNode: FlowData = Utils.findTreeLeef(data.value, 'id', parentId, 'childNode');
  if (parentNode) {
    if (nodeData.childNode) {
      nodeData.childNode.parentId = parentNode.id;
    }
    parentNode.childNode = nodeData.childNode;
  }
  emit('del-node', nodeData);
};

const { data } = toRefs(props);
</script>

<style lang="scss" scoped>
.flow-container {
  display: inline-block;
  background: #f5f5f7;
  padding: 20px;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  overflow: auto;
}

.condition-box {
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;

  // padding: 10px 20px;
  .condition-icon {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #e5e5e5;
    border-radius: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px;
    cursor: pointer;
    margin-bottom: 4px;

    .iconfont {
      font-size: 30px;
    }
  }
}
</style>
