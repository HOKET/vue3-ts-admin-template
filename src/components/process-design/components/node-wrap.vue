<template>
  <div class="node-wrap">
    <div :class="['node-wrap-box', data.type]">
      <!-- <div class="el-tooltip error-tip" aria-describedby="el-tooltip-2244" tabindex="0">!!!</div> -->
      <section :class="['flow-path-card', data.type]">
        <header class="header">
          <div class="title-box" style="height: 100%; width: 190px">
            <span class="title-text">{{ data.title }}</span>
          </div>
          <div class="actions" style="margin-right: 4px">
            <el-icon @click.stop="handleDelNode(data)">
              <CloseBold />
            </el-icon>
          </div>
        </header>
        <div class="body">
          <span class="text">{{ data.content }}</span>
          <div class="icon-wrapper right">
            <el-icon class="right-arrow">
              <ArrowRight />
            </el-icon>
          </div>
        </div>
      </section>
      <div class="add-node-btn-box flex justify-center">
        <div class="add-node-btn">
          <el-popover
            ref="popoverRef"
            trigger="click"
            placement="right">
            <template #reference>
              <el-button
                class="btn"
                type="primary"
                circle
                icon="Plus" />
            </template>
            <template #default>
              <slot name="button-popover" :data="data" />
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
  <template v-if="data.childNode">
    <node-wrap :data="data.childNode">
      <template #button-popover>
        <slot name="button-popover" :data="data.childNode" />
      </template>
    </node-wrap>
  </template>
</template>

<script setup lang="ts" name="NodeWrap">
import { toRefs, ref } from 'vue';
import { FlowData } from './types';
const popoverRef = ref<any>(null);
const curHandleType = ref('');
const props = withDefaults(defineProps<{ data: FlowData }>(), {
  data: () => {
    return {
      id: '1',
      type: 'start',
      title: '标题',
      content: '内容',
      parentId: null
    };
  }
});

const emit = defineEmits<{
  (e: 'add-node', handleType: string, data: FlowData): void
  (e: 'del-node', data: FlowData): void
}>();
// 新增节点
const handleAddNode = (type: string): void => {
  popoverRef.value.hide();
  curHandleType.value = type;
  emitAddNode(data.value);
};
const emitAddNode = (nodeData: FlowData): void => {
  emit('add-node', curHandleType.value, nodeData);
};
// 删除节点
const handleDelNode = (nodeData: FlowData): void => {
  if (nodeData.type !== 'start') {
    emit('del-node', nodeData);
  }
};
const hidePopover = () => {
  popoverRef.value.hide();
};
defineExpose({
  hidePopover
});
const { data } = toRefs(props);
</script>
<style lang="scss" scoped>
*,
:after,
:before {
  box-sizing: border-box;
}

.right {
  right: 0;
}

.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.justify-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.right {
  right: 0;
}

.node-wrap {
  .node-wrap-box {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;

    &.audit::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      width: 0;
      height: 4px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: #cacaca transparent transparent;
      background: #f5f5f7;
    }

    .flow-path-card {
      width: 220px;
      min-height: 82px;
      font-size: 12px;
      border-radius: 4px;
      text-align: left;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-shadow: 0 0 6px 0 rgb(0 0 0 / 30%);
      box-shadow: 0 0 6px 0 rgb(0 0 0 / 30%);
      background: #fff;

      &:not(.start):hover .actions {
        visibility: visible;
      }

      &.start {
        &:hover {
          box-shadow: 0 0 0 2px #576a95, 0 0 5px 4px rgb(0 0 0 / 20%);
        }

        .header {
          background-color: #576a95;
        }
      }

      &.audit {
        &:hover {
          box-shadow: 0 0 0 2px #ff9431, 0 0 5px 4px rgb(0 0 0 / 20%);
        }

        .header {
          background-color: #ff9431;
        }
      }

      &.forward {
        &:hover {
          box-shadow: 0 0 0 2px #3296fa, 0 0 5px 4px rgb(0 0 0 / 20%);
        }

        .header {
          background-color: #3296fa;
        }
      }

      .header {
        padding-left: 16px;
        padding-right: 30px;
        width: 100%;
        height: 24px;
        line-height: 24px;
        color: #fff;
        position: relative;
        box-sizing: border-box;

        .title-box {
          position: relative;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .title-text {
            vertical-align: middle;
          }
        }

        .actions {
          position: absolute;
          right: 0;
          top: 0;
          visibility: hidden;
        }
      }

      .body {
        position: relative;
        padding: 12px;
        padding-right: 30px;
        box-sizing: border-box;

        .text {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        .icon-wrapper {
          position: absolute;
          top: 0;
          height: 100%;
          width: 14px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;

          .right-arrow {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    .add-node-btn-box {
      width: 220px;
      height: 100px;
      position: relative;
      padding-top: 30px;
      margin: auto;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca;
      }

      .add-node-btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;

        .btn:hover {
          transform: scale(1.2);
          box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
        }
      }
    }
  }
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
