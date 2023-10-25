<template>
  <el-image
    :src="img_src"
    :v-show="img_src != ''"
    :width="props.w * 56"
    :height="props.h * 56"
  />
</template>

<script setup>
import { ref, toRaw, watch } from "vue";
import { url_safe_base64 } from "../utils/commonUtils";

const props = defineProps(["blocks", "w", "h", "solution", "id"]);
const img_src = ref("");

window.API.startCalc(
  toRaw(props.blocks),
  [toRaw(props.h), toRaw(props.w)],
  toRaw(props.id)
);

watch(
  () => props.solution,
  () => {
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
  }
);
</script>
