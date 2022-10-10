<template>
  <div class="chart-content">
    <div class="left-content">
      <bar-chart class="chart-wrapper" :chartConfig="chartConfig" />
    </div>
    <div class="right-content">
      <bar-config class="config-wrapper" :optionData="optionData" />
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import BarChart from "@/packages/components/Charts/Bars/vertical-bar/index.vue";
import BarConfig from "@/packages/components/Charts/Bars/vertical-bar/config.vue";
import { option } from "@/packages/components/Charts/Bars/vertical-bar/config.ts";
const chartConfig = reactive({
  option,
});
const optionData = reactive({
  ...option,
});
</script>
<style lang="scss" scoped>
.chart-content {
  .chart-wrapper {
    height: 380px;
    width: 700px;
  }

  :deep(.el-collapse) {
    border-top: none;
    border-bottom: none;
  }

  :deep(.el-collapse-item) {
    border-top: none;
    border-bottom: none;
  }

  .config-wrapper {
    :deep(.el-collapse-item__header) {
      background: #2d2f38;
      color: #fff;
      border-bottom: 1px solid #393b4a;
    }

    :deep(.el-collapse-item__wrap) {
      background: #22242b;
      color: #fff;
      border-bottom: 1px solid transparent;

      .el-collapse-item__header {
        background: #22242b;
        color: #fff;
      }
    }

    :deep(.el_select_wrapper) {
      width: 119px;
    }

    :deep(.el-form--label-left) {
      width: 100%;

      .el-collapse-item__content {
        padding-left: 10px;
        padding-top: 10px;
      }
    }

    :deep(.series-content) {
      color: #fff;
    }

    :deep(.el-tabs__item) {
      color: #fff;

      &.is-active {
        color: #409eff;
      }
    }

    :deep(.el-collapse-item__content) {
      position: relative;

      .handle_content {
        position: absolute;
        right: 12px;
        top: 20px;

        .el-icon {
          font-size: 16px;
          cursor: pointer;

          &.no-inherit {
            margin-left: 10px;
          }
        }
      }
    }

    :deep(.el-collapse-item__header) {
      padding-left: 25px;
    }
  }
}
</style>
