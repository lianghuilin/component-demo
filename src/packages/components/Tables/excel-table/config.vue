<template>
  <el-collapse v-model="activeCollapseName">
    <el-collapse-item title="表头" name="header">
      <el-form :label-width="labelWidth">
        <el-form-item>
          <el-switch v-model="headers.show" />
        </el-form-item>
        <el-form-item label="高度">
          <el-input-number
            v-model="headers.height"
            :min="1"
            size="small"
            placeholder="请输入自动计算"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker size="small" v-model="headers.background"></el-color-picker>
        </el-form-item>
        <el-form-item label="字体粗细">
          <el-select
            class="el_select_wrapper"
            v-model="headers.textStyle.fontWeight"
            size="mini"
            placeholder="Select"
          >
            <el-option
              v-for="item in tableConfig.fontWeightList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number
            v-model="headers.textStyle.fontSize"
            :min="1"
            size="small"
            placeholder="请输入自动计算"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker
            size="small"
            v-model="headers.textStyle.color"
          ></el-color-picker>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="序列号" name="index">
      <el-form :label-width="labelWidth">
        <el-form-item>
          <el-switch v-model="indexConfig.show" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            v-model="indexConfig.label"
            size="small"
            class="el_mark_wrapper"
          ></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="indexConfig.align" class="el_select_wrapper">
            <el-option
              v-for="item in tableConfig.positionList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="宽度">
          <el-input-number
            v-model="indexConfig.width"
            :min="1"
            size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="字体粗细">
          <el-select
            v-model="indexConfig.labelStyle.fontWeight"
            class="el_select_wrapper"
          >
            <el-option
              v-for="item in tableConfig.fontWeightList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number
            v-model="indexConfig.labelStyle.fontSize"
            :min="1"
            size="small"
            placeholder="请输入自动计算"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker
            size="small"
            v-model="indexConfig.labelStyle.color"
          ></el-color-picker>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="列" name="columns">
      <el-tabs class="demo-tabs" v-model="activeColumns">
        <el-tab-pane
          :label="`列${i + 1}`"
          :name="i + 1"
          v-for="(item, i) in columnList"
          :key="i"
        >
          <el-form :label-width="labelWidth">
            <el-form-item label="字段名">
              <el-input
                v-model="item.key"
                :min="1"
                size="small"
                class="el_mark_wrapper"
              ></el-input>
            </el-form-item>
            <el-form-item label="显示名">
              <el-input
                v-model="item.label"
                :min="1"
                size="small"
                class="el_mark_wrapper"
              ></el-input>
            </el-form-item>
            <el-form-item label="位置">
              <el-select v-model="item.align" class="el_select_wrapper">
                <el-option
                  v-for="item in tableConfig.positionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="宽度">
              <el-input-number
                v-model="item.width"
                :min="30"
                size="small"
                placeholder="请输入自动计算"
              >
              </el-input-number>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="handle_content">
        <el-icon color="#fff" @click="addColumns">
          <CirclePlus />
        </el-icon>
        <el-icon color="#fff" class="no-inherit" @click="deleteColumns">
          <Delete />
        </el-icon>
      </div>
    </el-collapse-item>
    <el-collapse-item title="行配置" name="rows">
      <el-tabs class="demo-tabs" v-model="activeRow">
        <el-tab-pane
          :label="`行${i + 1}`"
          :name="i + 1"
          v-for="(row, i) in rowsList"
          :key="i"
        >
          <el-form :label-width="labelWidth">
            <el-form-item label="背景色">
              <el-color-picker size="small" v-model="row.background"></el-color-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="handle_content">
        <el-icon color="#fff" @click="addRows">
          <CirclePlus />
        </el-icon>
        <el-icon color="#fff" class="no-inherit" @click="deleteRows">
          <Delete />
        </el-icon>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { tableConfig } from "@/packages/configuration/table";
import { cloneDeep } from "lodash";
import { columnsItem, rowsItem } from "./config.ts";

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
const labelWidth = ref(80);
let activeColumns = ref(1);
let activeRow = ref(1);
let activeCollapseName = ref("columns");
const headers = computed(() => props.optionData.headers);
const indexConfig = ref(props.optionData.indexConfig);
const columnList = ref(props.optionData.columns);
const rowsList = ref(props.optionData.rows);
const addColumns = () => {
  columnList.value.push(cloneDeep(columnsItem));
  activeColumns.value = columnList.value.length;
};
const addRows = () => {
  rowsList.value.push(cloneDeep(rowsItem));
  activeRow.value = rowsList.value.length;
};
const deleteColumns = () => {
  columnList.value.pop();
};
const deleteRows = () => {
  if (rowsList.value.length === 1) return;
  rowsList.value.pop();
};
</script>
