<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select
            v-model="character"
            @change="selectCharacter"
            :disabled="calc_state"
            placeholder="选择角色"
            filterable
            :filter-method="filterCharacters"
          >
            <el-option
              v-for="item in character_list"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="6"
          ><el-select
            v-model="reso_level"
            @change="selectResoLevel"
            :disabled="calc_state"
            placeholder="选择共鸣等级"
          >
            <el-option
              v-for="item in reso_level_list"
              :key="item"
              :label="item"
              :value="item"
            /> </el-select
        ></el-col>
        <el-col :span="6">
          <el-select
            v-model="calc_mode"
            @change="selectMode"
            placeholder="选择模式（暂时没用）"
          >
          </el-select
        ></el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            @click="startCalc"
            v-if="!calc_state"
            :disabled="!characterAndLevelSelected"
            >开始</el-button
          >
          <el-button type="danger" @click="stopCalc" v-else>停止</el-button>
          <el-button type="default">导出（暂时没用）</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <CharacterInfo
            :name="character"
            :level="reso_level"
            v-if="characterAndLevelSelected"
          ></CharacterInfo>
        </el-col>
        <el-col :span="20">
          <ResoTable v-if="characterAndLevelSelected" :data="sol_data">
          </ResoTable>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  provide,
  toRaw,
} from "vue";

import { TableV2SortOrder } from "element-plus";

//import CharacterInfo from "./CharacterInfo.vue";
import CharacterInfo from "./CharacterInfo.vue";
import ResoTable from "./ResoTable.vue";

const character_list = ref([]);
let character_list_backup = [];
const character = ref("");
const character_data = ref({});
const reso_level_list = ref([]);
const reso_level = ref("");
const board_size = ref([]);
const calc_mode = ref("");
const calc_state = ref(false);

const blocks_data = ref({});
let blocks_data_map = {};
let blocks_use_count = {};

//记录每个ID对应的解的数值
const sol_data = ref([]);

//记录每个ID对应的解的块坐标以及角度
const solutions = ref([]);

provide("character_data", character_data);
provide("blocks_data", blocks_data);
provide("solutions", solutions);

const readCharacterList = async () => {
  character_list_backup = await window.API.getCharacterList();
  character_list.value = character_list_backup.map((i) => i.ch_name);
};

const selectCharacter = async (name) => {
  character_data.value = await window.API.getCharacterData(name);
  reso_level.value = "";
  reso_level_list.value = character_data.value.resonate.map((i) => i.level);
  blocks_use_count = {};
  sol_data.value = [];
};

const selectResoLevel = async (level) => {
  sol_data.value = [];
  blocks_use_count = {};
  blocks_data.value = character_data.value.resonate.filter(
    (i) => i.level == level
  )[0].blocks;
  blocks_data.value.forEach((i) => {
    blocks_use_count[i.shape] = parseInt(i.count);
  });
  blocks_data_map = {};
  blocks_data.value
    .map((block_data) => ({
      [block_data.shape]: toRaw(block_data.prop),
    }))
    .reduce((acc, obj) => Object.assign(acc, obj), blocks_data_map);
  await getBoardSize(level);
};

const getBoardSize = async (level) => {
  board_size.value = await window.API.getBoardSize(level);
};

const startCalc = async () => {
  sol_data.value = [];
  solutions.value = [];
  window.API.startCalcFakeSol(blocks_use_count, toRaw(board_size.value));
  calc_state.value = true;
};

const stopCalc = async () => {
  window.API.stopCalcFakeSol();
  calc_state.value = false;
};

const selectMode = async (mode) => {};

const characterAndLevelSelected = computed(() => {
  return character.value != "" && reso_level.value != "";
});

onMounted(async () => {
  await readCharacterList();
});

let buffer = [];

window.API.onFakeSol((_event, sol) => {
  const props = Object.keys(sol).reduce((acc, cur) => {
    blocks_data_map[cur].forEach((prop) => {
      acc[prop.name] =
        (acc[prop.name] ?? 0) +
        prop.value * (Math.min(sol[cur], 3) + Math.max(sol[cur] - 3, 0) * 0.3);
    });
    return acc;
  }, {});
  props.blocks = sol;
  props.sol = null;
  props.board_size = toRaw(board_size.value);
  props.id = buffer.length;
  buffer.push(props);
});

window.API.onFakeSolStart(() => {
  buffer = [];
  sol_data.value = [];
  solutions.value = [];
});

window.API.onFakeSolFinish(() => {
  sol_data.value = sol_data.value.concat(buffer.slice(sol_data.value.length));
  solutions.value = Array(sol_data.value.length);
  calc_state.value = false;
});

window.API.onSolution((_event, sol, id) => {
  solutions.value[id] = sol;
});

const filterCharacters = (e) => {
  if (e) {
    e = e.toLowerCase();
    character_list.value = character_list_backup
      .filter((item) => {
        return (
          item.ch_name.toLowerCase().indexOf(e) != -1 ||
          item.en_name.toLowerCase().indexOf(e) != -1 ||
          item.pinyin_name.toLowerCase().indexOf(e) != -1
        );
      })
      .map((i) => i.ch_name);
  } else {
    character_list.value = character_list_backup.map((i) => i.ch_name);
  }
  return character_list;
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
