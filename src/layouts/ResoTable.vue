<template>
  <el-card>
    <el-table :data="data">
      <el-table-column type="expand">
        <template #default="props">
          <ResoImage
            :solution="props.row.sol"
            :w="props.row.board_size[1]"
            :h="props.row.board_size[0]"
          ></ResoImage>
        </template>
      </el-table-column>
      <el-table-column sortable prop="id" label="ID"></el-table-column>
      <el-table-column sortable prop="hp" label="生命(%)"></el-table-column>
      <el-table-column
        sortable
        prop="hp_literal"
        label="生命"
      ></el-table-column>
      <el-table-column sortable prop="atk" label="攻击(%)"></el-table-column>
      <el-table-column
        sortable
        prop="atk_literal"
        label="攻击"
      ></el-table-column>
      <el-table-column
        sortable
        prop="r_def_literal"
        label="现实防御"
      ></el-table-column>
      <el-table-column
        sortable
        prop="r_def"
        label="现实防御(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="i_def_literal"
        label="精神防御"
      ></el-table-column>
      <el-table-column
        sortable
        prop="i_def"
        label="精神防御(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="dmg_bst"
        label="创伤加成(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="dmg_red"
        label="创伤减免(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="crit"
        label="暴击伤害(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="crit_rate"
        label="暴击率(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="crit_def"
        label="暴击抗性(%)"
      ></el-table-column>
      <el-table-column
        sortable
        prop="crit_rate_def"
        label="抗暴率(%)"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import ResoImage from "./ResoImage.vue";

const props = defineProps(["data"]);

const resoData = ref([]);
</script>
