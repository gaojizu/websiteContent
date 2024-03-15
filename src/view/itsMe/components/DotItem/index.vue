<!--
 * @use: 
 * @description: 时间节点组件
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-03-05 14:49:12
 * @FilePath: /websiteContent/src/view/itsMe/components/DotItem/index.vue
-->
<template>
  <div class="dot-content" :style="{ backgroundColor: itemProps.dotColor }">
    <div class="dot-desc">
      <div>打码等级：</div>
      <div class="dot-title">{{ itemProps.title }}</div>
    </div>
    <div class="dot-desc">
      <div>公司名称：</div>
      <div class="dot-company">{{ itemProps.componyName }}</div>
    </div>
    <div class="dot-desc">
      <div>在岗时间：</div>
      <div class="dot-time">{{ itemProps.dateSlot }}</div>
    </div>
    <div class="dot-desc">
      <div>公司简介：</div>
      <div class="dot-intro">{{ itemProps.intro }}</div>
    </div>
    <div class="dot-desc">
      <div>职责简介：</div>
      <div class="dot-intro">{{ itemProps.todo }}</div>
    </div>
    <div class="dot-desc">
      <div>离职原因：</div>
      <div class="dot-intro">{{ itemProps.leaveReason }}</div>
    </div>
    <div class="dot-desc dot-item-project" @click="renderMd(itemProps)">
      <div>项目介绍：</div>
      <div class="dot-project">
        {{ itemProps.projectContent }} 查看 {{ itemProps.componyName }} 项目
      </div>
    </div>
  </div>
  <RenderMdDrawer
    :openDrawer="openDrawer"
    :markdownContent="markdownContent"
    :title="titleDrawer"
    @closeDrawer="closeDrawer"
  >
  </RenderMdDrawer>
</template>
<script setup>
import { ref } from "vue";
import { useGetMarkdownFile } from "@/hooks/useGetMarkdownFile";
import RenderMdDrawer from "@/components/RenderMdDrawer/index.vue";
defineProps({
  itemProps: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const openDrawer = ref(false);
const titleDrawer = ref("");
// TODO: 关闭抽屉
const closeDrawer = (val) => {
  openDrawer.value = val;
};
const markdownContent = ref();
// TODO: 渲染公司项目md
const renderMd = async (item) => {
  markdownContent.value = await useGetMarkdownFile(item.path);
  titleDrawer.value = item.componyName;
  openDrawer.value = true;
};
</script>
<style lang="scss" scoped>
.dot-content {
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  box-sizeing: border-box;
  .dot-desc {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .dot-item-project {
    cursor: pointer;
  }
}
</style>
