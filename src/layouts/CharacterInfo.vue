<template>
  <el-card class="box-card">
    <!--基本信息-->
    <div class="card-header">
      <div>
        <el-image :src="img_src" />
        <span>{{ name }} {{ level }}</span>
      </div>
    </div>

    <!--块-->
    <div>
      <BlockInfo
        v-for="(block, key) in blocks_data"
        :shape="block.shape"
        :count="block.count"
        :level="block.level"
        :key="key"
        @update-use-count="updateUseCount"
      ></BlockInfo>
    </div>
  </el-card>
</template>

<script setup>
//import { defineProps } from "vue";

import { ref, onMounted, watch, onUpdated, inject, computed } from "vue";
import BlockInfo from "./BlockInfo.vue";

const props = defineProps(["name", "level"]);
const emits = defineEmits(["updateUseCount"]);

const img_src = computed(() => "");

const blocks_data = inject("blocks_data");

const updateUseCount = (shape, use_count) => {
  emits("updateUseCount", shape, use_count);
};

//watch(level, fetchCharacterData);
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
