<template>
  <div class="dv-scroll-board">
    <div
      class="header"
      v-if="tableConfig.mergedConfig.headers.show"
      :style="`background-color: ${tableConfig.mergedConfig.headers.background};`"
    >
      <div
        class="header-item"
        v-for="headerItem in tableConfig.mergedConfig.columns"
        :key="headerItem.key"
        :style="getHeaderItemStyle(headerItem)"
        :align="headerItem.align"
        v-html="headerItem.label"
      />
    </div>

    <div
      v-if="tableConfig.mergedConfig"
      class="rows"
      :style="`height: ${
        h -
        (tableConfig.mergedConfig.headers.show
          ? tableConfig.mergedConfig.headers.height
          : 0)
      }px;`"
    >
      <div
        class="row-item"
        v-for="(row, ri) in tableConfig.mergedConfig.rows"
        :key="`${row.toString()}${ri}`"
        :style="`
        height: ${tableConfig.heights[ri]}px;
        line-height: ${tableConfig.heights[ri]}px;
        background-color: ${row.background};
      `"
      >
        <div
          class="ceil"
          v-for="(ceil, ci) in tableConfig.mergedConfig.columns"
          :key="`${ceil}${ri}${ci}`"
          :style="getContentItemStyle(ceil)"
          :align="ceil.align"
          v-html="row[ceil.key]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, reactive, toRefs, watch, onMounted, computed } from "vue";
import { cloneDeep, merge } from "lodash";
import { vw, vh } from "@/config/viewport";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});
// 这里能拿到图表宽高等
const { w, h } = toRefs(props.chartConfig.attr);

const tableConfig = reactive({
  defaultConfig: {
    defRowNum: 5,
    waitTime: 2,
    carousel: "single",
  },
  /**
   * 行数的高度
   */
  mergedConfig: cloneDeep(props.chartConfig.option),
  heights: [0],
  avgHeight: 0, // 行的平均高度
  animationIndex: 0,
  animationHandler: 0,
  updater: 0,
  rowsData: [],
  needCalc: false,
});
const calcData = () => {
  mergeConfig();
  calcHeaderData();
  calcRowsData();
  calcHeights();
};

onMounted(() => {
  calcData();
});
const mergeConfig = () => {
  tableConfig.mergedConfig = merge(
    cloneDeep(tableConfig.defaultConfig),
    props.chartConfig.option
  );
};
// 表格头部的样式
const getHeaderItemStyle = (item) => {
  const { height, background, textStyle } = tableConfig.mergedConfig.headers;
  const { columns } = tableConfig.mergedConfig;
  const { fontSize } = textStyle;
  const widthTotal = columns.reduce((pre, next) => pre + Number(next.width), 0);
  let width = item.width;
  if (widthTotal !== w.value) width = w.value / columns.length;
  return {
    width: vw(width),
    height: vh(height),
    lineHeight: vh(height),
    background,
    ...textStyle,
    fontSize: `${fontSize}px`,
  };
};
// 表格内容样式
const getContentItemStyle = (ceil) => {
  const { columns } = tableConfig.mergedConfig;
  const { width, labelStyle } = ceil;
  const { fontSize } = labelStyle;
  const widthTotal = columns.reduce((pre, next) => pre + Number(next.width), 0);
  let resetW = width;
  if (widthTotal !== w.value) resetW = w.value / columns.length;
  return {
    width: vw(resetW),
    ...labelStyle,
    fontSize: `${fontSize}px`,
  };
};
// 计算table的头部
const calcHeaderData = () => {
  let { columns, indexConfig } = tableConfig.mergedConfig;
  if (!indexConfig.show) {
    return;
  }
  columns = [...columns];
  columns.unshift(indexConfig);
  tableConfig.mergedConfig.columns = columns;
};
// 获取数据
const calcRowsData = () => {
  let { indexConfig, rows, dataset } = tableConfig.mergedConfig;
  let resetRows = dataset.map((set, i) => {
    const itemRow = rows[i] || rows[0];
    const indexTag = i + 1;
    if (indexConfig.show) itemRow.index = indexTag;
    return {
      ...set,
      ...itemRow,
    };
  });
  tableConfig.mergedConfig.rows = resetRows;
};

const calcHeights = (onresize = false) => {
  const { headers, rows } = tableConfig.mergedConfig;
  const { defRowNum } = tableConfig.defaultConfig;
  let allHeight = h.value;
  // 添加行数大于默认的行数判断
  const rowsLength = rows.length;
  let rowNum = rowsLength > defRowNum ? rowsLength : defRowNum;
  const rowHeight = (rows[0] && rows[0].height) || 0;
  if (headers.show) allHeight -= headers.height;
  let avgHeight = allHeight / rowNum;
  avgHeight = avgHeight > rowHeight ? rowHeight : avgHeight;
  tableConfig.avgHeight = avgHeight;
  if (!onresize) tableConfig.heights = new Array(rowsLength).fill(avgHeight);
};
const animation = async (start = false) => {
  const { needCalc } = tableConfig;

  if (needCalc) {
    calcRowsData();
    calcHeights();
    tableConfig.needCalc = false;
  }
  let { avgHeight, animationIndex, mergedConfig, rowsData, updater } = tableConfig;
  const { waitTime, carousel, rowNum } = mergedConfig;

  const rowLength = rowsData.length;
  if (rowNum >= rowLength) return;
  if (start) {
    await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
    if (updater !== tableConfig.updater) return;
  }
  const animationNum = carousel === "single" ? 1 : rowNum;
  let rows = rowsData.slice(animationIndex);
  rows.push(...rowsData.slice(0, animationIndex));
  tableConfig.rows = rows.slice(0, carousel === "page" ? rowNum * 2 : rowNum + 1);
  tableConfig.heights = new Array(rowLength).fill(avgHeight);
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (updater !== tableConfig.updater) return;
  tableConfig.heights.splice(0, animationNum, ...new Array(animationNum).fill(0));
  animationIndex += animationNum;
  const back = animationIndex - rowLength;
  if (back >= 0) animationIndex = back;
  tableConfig.animationIndex = animationIndex;
  tableConfig.animationHandler = setTimeout(animation, waitTime * 1000 - 300);
};

const stopAnimation = () => {
  tableConfig.updater = (tableConfig.updater + 1) % 999999;
  if (!tableConfig.animationHandler) return;
  clearTimeout(tableConfig.animationHandler);
};
const onRestart = async () => {
  if (!tableConfig.mergedConfig) return;
  console.log("shi fou reactive");
  calcData();
};

watch(
  () => w.value,
  () => {
    onRestart();
  }
);

watch(
  () => h.value,
  () => {
    onRestart();
  }
);

// 数据更新
watch(
  () => props.chartConfig.option,
  () => {
    onRestart();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.dv-scroll-board {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;

  .text {
    padding: 0 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header {
    display: flex;
    flex-direction: row;
    font-size: 15px;

    .header-item {
      transition: all 0.3s;
    }
  }

  .rows {
    overflow: hidden;

    .row-item {
      display: flex;
      font-size: 14px;
      transition: all 0.3s;
      overflow: hidden;
    }
  }
}
</style>
