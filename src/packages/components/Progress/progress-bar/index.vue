<template>
  <div class="process-table-content">
    <div class="pro-table-item" v-for="item in tableData.rows" :key="item.ranking">
      <div class="text-content">
        <div
          class="left-content"
          :style="`font-size: ${leftFontSize}px;color:${textColor}`"
        >
          <span class="text">{{ item.name }}</span>
        </div>
        <div
          class="right-cotent"
          :style="`font-size: ${rightFontSize}px;color:${textColor};background-color:${rightBackground}`"
        >
          <span class="right-value"
            >{{ item.value
            }}<em class="icon-unit" :style="`color:${unitColor};font-size:${unitSize}`">{{
              unit
            }}</em></span
          >
          <em class="icon-em">/</em>
          <span class="right-percent">{{ item.percent }}</span>
        </div>
      </div>
      <div
        class="progress-line-out"
        :style="`height: ${processH}px;border-radius:${borderRadius}px`"
      >
        <div
          class="progress-line-inner animate-process"
          :style="`background-color:${processColor};
                width:${item.percent};
                height: ${processH}px;
                border-radius:${borderRadius}px`"
        >
          <div
            class="animate-infinite"
            :style="`background:${infiniteColor};
                        height: ${processH}px;
                    border-radius:${borderRadius}px`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, toRefs, onMounted, ref, nextTick, onUnmounted } from "vue";
const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});
const {
  unit,
  unitSize,
  unitColor,
  color,
  processH,
  borderRadius,
  processColor,
  textColor,
  leftFontSize,
  rightFontSize,
  rightBackground,
  infiniteColor,
} = toRefs(props.chartConfig.option);
const formatterRows = () => {
  const rowList = [];
  const { dataset = [] } = props.chartConfig.option;
  const def = {
    name: "",
    value: "",
    percent: 0,
  };
  for (let i = 0; i < dataset.length; i++) {
    rowList.push({
      ...def,
      ranking: i + 1,
    });
  }
  return rowList;
};
const tableData = reactive({
  mergedConfig: props.chartConfig.option,
  rowsData: [],
  rows: formatterRows(),
});
const calcRowsData = () => {
  let { dataset } = tableData.mergedConfig;
  const values = dataset.map((item) => item.value);
  const maxValue = Math.max(...values);
  dataset = dataset.map((row, i) => ({
    ...row,
    ranking: i + 1,
    percent: `${((row.value / maxValue) * 100).toFixed(2)}%`,
  }));
  tableData.rows = dataset;
};

onMounted(() => {
  calcRowsData();
});
</script>
<style lang="scss" scoped>
.text-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.pro-table-item {
  margin-bottom: 10px;
}

em {
  font-style: normal;

  &.icon-unit {
    margin-left: 2px;
  }

  &.icon-em {
    margin-left: 4px;
    margin-right: 4px;
  }
}

.progress-line-out {
  width: 100%;
  background: #283347;
}

.process-table-content {
  background: #1b263d;
}

.animate-process {
  transition: all 1s linear;
}

.animate-infinite {
  animation: mymove 5s infinite;
  -webkit-animation: mymove 5s infinite;
}

@keyframes mymove {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

@-webkit-keyframes mymove

/*Safari and Chrome*/ {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
</style>
