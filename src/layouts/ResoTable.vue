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
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.key"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.title }}</el-tag
    >
    <el-select
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @change="selectChange"
    >
      <el-option
        v-for="option in options"
        :key="option.key"
        :label="option.title"
        :value="option"
      ></el-option>
    </el-select>
    <el-button
      v-else
      class="button-new-tag ml-1"
      size="small"
      @click="showInput"
      >+ 排序</el-button
    >
    <el-table-v2 :columns="columns" :data="data" :width="1200" :height="600">
    </el-table-v2>
  </el-card>
</template>

<script setup>
import { ref, computed, h, toRaw, watch, nextTick, onMounted } from "vue";
import ResoImage from "./ResoImage.vue";
import { ElPopover, ElButton, TableV2, TableV2SortOrder } from "element-plus";

const props = defineProps(["data"]);

const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref();
const dynamicTags = ref([]);

const dataSorted = ref([]);

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
  {
    key: "show",
    dataKey: "show",
    title: "查看",
    width: 60,
    // TODO:
    cellRenderer: (data) =>
      h(
        ElPopover,
        {
          trigger: "click",
          width: "300px",
          placement: "left",
          onShow: () => {
            if (data.rowData.sol == null) {
              window.API.startCalc(
                toRaw(data.rowData.blocks),
                [
                  toRaw(data.rowData.board_size[0]),
                  toRaw(data.rowData.board_size[1]),
                ],
                toRaw(data.rowData.id)
              );
            }
          },
        },
        {
          reference: () => h(ElButton, () => "计算"),
          default: () =>
            h(ResoImage, {
              blocks: data.rowData.blocks,
              solution: data.rowData.sol,
              w: data.rowData.board_size[1],
              h: data.rowData.board_size[0],
              id: data.rowData.id,
            }),
        }
      ),
  },
];

let options_backup = columns.slice(1, -1);
const options = ref(options_backup);

watch(
  () => props.data,
  () => {
    dataSorted.value = props.data;
    sortByTags();
  }
);

watch(
  dynamicTags,
  () => {
    options.value = options_backup.filter((i) => {
      return !dynamicTags.value.some((j) => j.title == i.title);
    });

    sortByTags();
  },
  { deep: true }
);

const sortByTags = () => {
  dataSorted.value.sort((a, b) => {
    let tag;
    for (tag of dynamicTags.value) {
      let tag_name = tag.key;
      if (a[tag_name] < b[tag_name]) return 1;
      else if (a[tag_name] > b[tag_name]) return -1;
      else continue;
    }
    if (a.id < b.id) return -1;
    else return 1;
  });
};

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.focus();
  });
};

const selectChange = (e) => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
onMounted(() => {
  sortByTags();
});
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
.el-image {
  background: linear-gradient(45deg, #eeeeee, #cccccc);
}
.mx-1 {
  margin: 0 0.25rem;
}
</style>
