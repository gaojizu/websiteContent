<template>
  <div class="warpper">
    <div class="content">
      <!-- <div class="its-image" id="itsImage"></div> -->
      <div class="its-me" id="itsMe">IT`S ME</div>
    </div>
    <v-parallax :src="material">
      <div class="its-content">
        <!-- 标签信息 -->
        <a-space
          class="its-space"
          direction="vertical"
          v-for="(item, index) in baseInfo"
          :key="index"
        >
          <a-badge-ribbon :text="item.enTitle" :color="item.color">
            <a-card :title="item.title" size="small">
              <div class="info-card">
                <div v-if="item.display" class="info-display">{{ item.display }}</div>
                <div v-else class="info-tag">
                  <a-tag
                    class="info-tag"
                    v-for="(it, idx) in item.tags"
                    :color="it.tagColor"
                    :key="idx"
                    >{{ it.tagName }}</a-tag
                  >
                </div>
                <div class="its-explain">
                  {{ item.explain }}
                </div>
              </div>
            </a-card>
          </a-badge-ribbon>
        </a-space>
      </div>
    </v-parallax>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { isBottom } from "@/common/utils";
import { baseInfo } from "./common/baseInfo";
import material from "@/assets/images/material.jpg";

// 滚动效果
const handleScroll = () => {
  const scrollingText = document.getElementById("itsMe");
  const scrollY = window.scrollY;
  const scale = 1 + scrollY * 0.05;
  scrollingText.style.transform = `scale(${scale})`;
  if (isBottom()) {
    scrollingText.style.display = "none";
  } else {
    scrollingText.style.display = "block";
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
@import "@/base.scss";
@import "@/layout.scss";

.warpper {
  padding-bottom: 100px;
  .its-footer {
    color: #fff;
  }

  .content {
    height: 300vh;
    @extend .common-flex-row-center;
    color: $baseColor;
    box-sizing: border-box;
    position: relative;

    .its-me {
      font-size: 80px;
      position: fixed;
      top: 45%;
      text-align: center;
    }

    .its-image {
      position: fixed;
      top: 0;
      left: 0;
      background: url("@/assets/images/funcss.jpg") no-repeat;
      width: 100vw;
      height: 100vh;
      background-size: cover;
      background-position: center;
    }
  }

  .its-content {
    color: $baseColor;
    box-sizing: border-box;
    padding: 10px;
    @extend .common-flex-row;
    justify-content: space-around;
    flex-wrap: wrap;

    .its-card {
      color: $baseColor;
      background: rgba(0, 0, 0, 0.5);
    }

    .its-space {
      margin: 0 20px 20px 0;
      max-width: 30%;
      min-width: 20%;

      .info-card {
        .info-display {
          font-weight: bold;
        }
        .info-tag {
          .info-tag {
            margin: 0 5px 5px 0;
          }
        }
      }
    }
  }
}
</style>
