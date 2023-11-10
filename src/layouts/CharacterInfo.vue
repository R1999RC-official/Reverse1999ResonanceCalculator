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
    <div></div>
  </el-card>
</template>

<script setup>
//import { defineProps } from "vue";

import { ref, onMounted, watch, onUpdated, inject, computed } from "vue";

const props = defineProps(["name", "level"]);

const img_src = computed(() => "");

//watch(level, fetchCharacterData);
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
