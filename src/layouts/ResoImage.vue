<template>
  <el-image
    v-loading="loading"
    :src="img_src"
    :width="props.w * 56"
    :height="props.h * 56"
  />
</template>

<script setup>
import { ref, toRaw, watch, inject } from "vue";
import { url_safe_base64 } from "../utils/commonUtils";

const solutions = inject("solutions");

const props = defineProps(["blocks", "w", "h", "solution", "id"]);
const img_src = ref("");
const loading = ref("true");

watch(
  () => solutions.value[props.id],
  () => {
    if (solutions.value[props.id] == null) {
      return;
    }
    const block_width = 56;

    const canvasWidth = props.w * block_width;
    const canvasHeight = props.h * block_width;
    //const canvas = createCanvas(canvasWidth, canvasHeight);
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    Promise.all(
      solutions.value[props.id].map((block) => {
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
      loading.value = false;
    });
  },
  { deep: true }
);
</script>
