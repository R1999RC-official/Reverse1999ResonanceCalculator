<template>
  <div>
    <el-image :src="img_src" ref="block_img" @load="img_loaded" />
  </div>
  <div>
    <el-slider
      show-input
      show-stops
      :max="parseInt(count)"
      v-model="use_count"
      @change="$emit('updateUseCount', props.shape, use_count)"
    ></el-slider>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { url_safe_base64 } from "../utils/commonUtils";

const props = defineProps(["shape", "level", "count"]);
const emits = defineEmits(["updateUseCount"]);
const block_img = ref();

const use_count = ref(Math.min(parseInt(props.count), 3));

const img_src = computed(() => `img/${url_safe_base64(props.shape)}.png`);

const img_loaded = (event) => {
  const zoom_rate = 0.5;
  event.target.style.width = `${event.target.width * zoom_rate}px`;
  //event.target.style.height = `${event.target.height * zoom_rate}px`;
};

onMounted(() => {
  emits("updateUseCount", props.shape, use_count.value);
});
</script>

<style scope>
.el-image {
  background: linear-gradient(45deg, #eeeeee, #cccccc);
}
.el-row {
  margin-bottom: 20px;
}
</style>
src/src-common/commonUtils
