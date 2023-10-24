<template>
  <el-image :src="img_src" :v-show="img_src != ''" />
</template>

<script setup>
import { ref } from "vue";
import { url_safe_base64 } from "../utils/commonUtils";

const props = defineProps(["solution", "w", "h"]);
const img_src = ref("");

const block_width = 56;

const canvasWidth = props.w * block_width;
const canvasHeight = props.h * block_width;
//const canvas = createCanvas(canvasWidth, canvasHeight);
const canvas = document.createElement("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

Promise.all(
  props.solution.map((block) => {
    return new Promise((resolve, reject) => {
      const shape = block[0];
      const row = block[1];
      const col = block[2];
      const rotation = block[3];
      const img = new Image();
      img.src = `img/${url_safe_base64(shape)}_${rotation}.png`;
      img.onload = () => {
        ctx.drawImage(img, col * block_width, row * block_width);
        resolve();
      };
    });
    //ctx.translate(img_width / 2, img_height / 2);
  })
).then(() => {
  img_src.value = canvas.toDataURL();
});
</script>
../src-common/commonUtils
