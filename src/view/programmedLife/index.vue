<!--
 * @use: 
 * @description: 程序人生模块
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-01-14 17:50:31
 * @FilePath: /websiteContent/src/view/programmedLife/index.vue
-->
<template>
  <div class="content">
    <BiographicalNotes></BiographicalNotes>
  </div>
</template>

<script setup>
import BiographicalNotes from "./components/BiographicalNotes/index.vue";
</script>

<style lang="scss" scoped>
@import "@/base.scss";
@import "@/layout.scss";

.content {
  background: $baseColor;
  box-sizing: border-box;
  padding: 30px 20px 30px 20px;
}
</style>
