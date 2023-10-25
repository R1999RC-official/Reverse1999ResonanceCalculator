<template>
  <el-card>
    <!--<el-table :data="data">
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
    </el-table>-->
    <el-table-v2 :columns="columns" :data="data" :width="1200" :height="400">
    </el-table-v2>
  </el-card>
</template>

<script lang="jsx" setup>
import { ref, computed } from "vue";
import ResoImage from "./ResoImage.vue";

const props = defineProps(["data"]);

const resoData = computed(() => {
  props.data.forEach((i) => {
    i.children = [
      {
        id: `${i.id}`,
        detail: 1,
        blocks: i.blocks,
        sol: i.sol,
        board_size: i.board_size,
      },
    ];
  });
  return props.data;
});

const columns = [
  {
    key: "id",
    dataKey: "id",
    title: "ID",
    width: 80,
  },
  {
    key: "hp",
    dataKey: "hp",
    title: "生命(%)",
    width: 100,
  },
  {
    key: "hp_literal",
    dataKey: "hp_literal",
    title: "生命",
    width: 100,
  },
  {
    key: "atk_literal",
    dataKey: "atk_literal",
    title: "攻击",
    width: 100,
  },
  {
    key: "atk",
    dataKey: "atk",
    title: "攻击(%)",
    width: 60,
  },
  {
    key: "r_def_literal",
    dataKey: "r_def_literal",
    title: "现实防御",
    width: 100,
  },
  {
    key: "r_def",
    dataKey: "r_def",
    title: "现实防御(%)",
    width: 60,
  },
  {
    key: "i_def_literal",
    dataKey: "i_def_literal",
    title: "精神防御",
    width: 100,
  },
  {
    key: "i_def",
    dataKey: "i_def",
    title: "精神防御(%)",
    width: 60,
  },
  {
    key: "dmg_bst",
    dataKey: "dmg_bst",
    title: "创伤加成(%)",
    width: 60,
  },
  {
    key: "dmg_red",
    dataKey: "dmg_red",
    title: "受创减免(%)",
    width: 60,
  },
  {
    key: "crit",
    dataKey: "crit",
    title: "暴击伤害(%)",
    width: 60,
  },
  {
    key: "crit_def",
    dataKey: "crit_def",
    title: "暴击防御(%)",
    width: 60,
  },
  {
    key: "crit_rate",
    dataKey: "crit_rate",
    title: "暴击率(%)",
    width: 60,
  },
  {
    key: "crit_rate_def",
    dataKey: "crit_rate_def",
    title: "抗暴率(%)",
    width: 60,
  },
  // {
  //   key: "show",
  //   dataKey: "show",
  //   title: "查看",
  //   width: 60,
  //   // TODO:cellRenderer: (data) => <ElPopover width="400"></ElPopover>,
  //   // <el-popover placement="left" :width="400" trigger="click"></el-popover>
  //   //   <template #reference>
  //   //     <el-button>123</el-button>
  //   //   </template>
  //   //   <ResoImage
  //   //     :blocks="props.rowData.blocks"
  //   //     :solution="props.rowData.sol"
  //   //     :w="props.rowData.board_size[1]"
  //   //     :h="props.rowData.board_size[0]"
  //   //     :id="props.rowData.id"
  //   //   ></ResoImage>
  //   // </el-popover>
  // },
];
</script>
<style>
.el-table-v2__row-depth-0 {
  height: 50px;
}

.el-table-v2__cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
