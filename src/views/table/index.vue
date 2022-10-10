<template>
  <div class="chart-content">
    <div class="left-content">
      <excel-table :chartConfig="chartConfig" />
    </div>
    <div class="right-content">
      <table-config :optionData="optionData" />
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import ExcelTable from "@/packages/components/Tables/excel-table/index.vue";
import tableConfig from "@/packages/components/Tables/excel-table/config.vue";
import { option } from "@/packages/components/Tables/excel-table/config.ts";
const chartConfig = reactive({
  option,
  attr: {
    w: 700,
    h: 380,
  },
});
const optionData = reactive({
  ...option,
});
</script>
<style lang="scss" scoped>
.chart-content {
  .left-content {
    :deep(.dv-scroll-board) {
      width: 700px;
      height: 380px;
    }
  }

  :deep(.el-collapse) {
    border-top: none;
    border-bottom: none;
  }

  :deep(.el-collapse-item) {
    border-top: none;
    border-bottom: none;
  }

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

  :deep(.el-form--label-left) {
    width: 100%;

    .el-collapse-item__content {
      padding-left: 10px;
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
      right: 20px;
      top: 12px;

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

  :deep(.el_select_wrapper) {
    .el-input__inner {
      width: 77px;
    }
  }

  :deep(.el_mark_wrapper) {
    width: 120px;

    .el-input__inner {
      width: 77px;
    }
  }

  :deep(.el-tabs__nav-wrap) {
    padding-left: 15px;
  }
}
</style>
