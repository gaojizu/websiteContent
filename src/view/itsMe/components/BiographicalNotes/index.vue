<!--
 * @use: 
 * @description:
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-03-05 14:29:45
 * @FilePath: /websiteContent/src/view/itsMe/components/BiographicalNotes/index.vue
-->
<template>
  <div class="biographical-notes">
    <a-timeline>
      <a-timeline-item  v-for="(item,index) in dotLists" :key="index" :color="item.dotColor">
        <DotItem :itemProps="item"/>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<script setup>
import DotItem from "../DotItem/index.vue";
import { dotLists } from "../../common/constants.js";
</script>
<style lang="scss" scoped>
.biographical-notes {
  color: #fff;
  background: #fff;
  padding: 20px;
  box-size: border-box;
}
</style>
