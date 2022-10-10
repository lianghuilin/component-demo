<template>
  <div class="config-content custom-scrollbar">
    <el-form label-width="85px" label-position="left">
      <el-collapse v-model="activeCollapseName">
        <el-collapse-item title="X轴" name="xAxis">
          <el-form-item label="显示隐藏">
            <el-switch v-model="xAxis.show" />
          </el-form-item>
          <el-collapse>
            <el-collapse-item title="文本">
              <el-form-item label="字号">
                <el-input-number
                  v-model="xAxis.axisLabel.fontSize"
                  :min="12"
                  :max="36"
                  size="small"
                  placeholder="自动计算"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker
                  size="small"
                  v-model="xAxis.axisLabel.color"
                ></el-color-picker>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="轴标签" name="shaftMark">
              <el-form-item label="角度">
                <el-select
                  v-model="xAxis.axisLabel.rotate"
                  size="small"
                  class="el_select_wrapper"
                >
                  <el-option
                    v-for="(item, index) in barConf.barStyle.xAxisPositions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="轴线" name="shaft">
              <el-form-item label="显示隐藏">
                <el-switch v-model="xAxis.axisLine.show" />
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker size="small" v-model="xAxis.axisLine.lineStyle.color">
                </el-color-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="xAxis.axisLine.lineStyle.type"
                  size="small"
                  class="el_select_wrapper"
                >
                  <el-option
                    v-for="item in barConf.barStyle.commonLineTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="粗细">
                <el-input-number
                  v-model="xAxis.axisLine.lineStyle.width"
                  :min="1"
                  :max="20"
                  size="small"
                >
                </el-input-number>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <el-collapse-item title="Y轴" name="yAxis">
          <el-form-item label="显示隐藏">
            <el-switch v-model="yAxis.show" />
          </el-form-item>
          <el-collapse>
            <el-collapse-item title="文本">
              <el-form-item label="字号">
                <el-input-number
                  v-model="yAxis.axisLabel.fontSize"
                  :min="12"
                  :max="36"
                  size="small"
                  placeholder="自动计算"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker
                  size="small"
                  v-model="yAxis.axisLabel.color"
                ></el-color-picker>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="轴标签" name="shaftMark">
              <el-form-item label="角度">
                <el-select
                  v-model="yAxis.axisLabel.rotate"
                  size="small"
                  class="el_select_wrapper"
                >
                  <el-option
                    v-for="(item, index) in barConf.barStyle.xAxisPositions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="轴线" name="shaft">
              <el-form-item label="显示隐藏">
                <el-switch v-model="yAxis.axisLine.show" />
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker size="small" v-model="yAxis.axisLine.lineStyle.color">
                </el-color-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="yAxis.axisLine.lineStyle.type"
                  size="small"
                  class="el_select_wrapper"
                >
                  <el-option
                    v-for="item in barConf.barStyle.commonLineTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="粗细">
                <el-input-number
                  v-model="xAxis.axisLine.lineStyle.width"
                  :min="1"
                  :max="20"
                  size="small"
                >
                </el-input-number>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="网格线" name="gride">
              <el-form-item label="显示隐藏">
                <el-switch v-model="yAxis.splitLine.show" />
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker size="small" v-model="yAxis.splitLine.lineStyle.color">
                </el-color-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="yAxis.splitLine.lineStyle.type"
                  size="small"
                  class="el_select_wrapper"
                >
                  <el-option
                    v-for="item in barConf.barStyle.commonLineTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <el-collapse-item title="图例" name="legend">
          <el-form-item label="显示隐藏">
            <el-switch v-model="legend.show" />
          </el-form-item>
          <el-collapse>
            <el-collapse-item title="文本样式" name="text">
              <el-form-item label="字号">
                <el-input-number
                  v-model="legend.textStyle.fontSize"
                  :min="12"
                  :max="36"
                  size="small"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker
                  size="small"
                  v-model="legend.textStyle.color"
                ></el-color-picker>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="图裂布局" name="position">
              <el-form-item label="位置">
                <el-radio-group v-model="legend.left">
                  <el-radio label="left">左</el-radio>
                  <el-radio label="center">中</el-radio>
                  <el-radio label="right">右</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="对齐">
                <el-radio-group v-model="legend.top">
                  <el-radio label="top">上</el-radio>
                  <el-radio label="middle">中</el-radio>
                  <el-radio label="bottom">下</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="间距">
                <el-input-number
                  v-model="legend.itemGap"
                  :min="10"
                  :max="100"
                  size="small"
                >
                </el-input-number>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <el-collapse-item title="数据系列" name="series">
          <el-tabs class="demo-tabs" v-model="activeName">
            <el-tab-pane
              :label="`系列${index + 1}`"
              :name="index + 1"
              v-for="(item, index) in seriesList"
              :key="index"
            >
              <el-form label-width="85px" label-position="left" class="series-content">
                <el-form-item label="系列名称">
                  <el-input size="small" v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker
                    size="small"
                    v-model="item.lineStyle.color"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="宽度">
                  <el-input-number
                    v-model="item.lineStyle.width"
                    :min="1"
                    :max="100"
                    size="small"
                    placeholder="自动计算"
                  >
                  </el-input-number>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select
                    v-model="item.lineStyle.type"
                    size="small"
                    class="el_select_wrapper"
                  >
                    <el-option
                      v-for="(item, index) in barConf.barStyle.commonLineTypes"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否平滑">
                  <el-select v-model="item.smooth" size="small" class="el_select_wrapper">
                    <el-option
                      v-for="(item, index) in barConf.barStyle.stackList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="handle_content">
            <el-icon color="#fff" @click="addSeries" v-if="showAdd">
              <CirclePlus />
            </el-icon>
            <el-icon color="#fff" class="no-inherit" @click="deleteSeries">
              <Delete />
            </el-icon>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { barConf } from "@/packages/configuration/chart/index";
import { getDiff } from "@/packages/public/utils";
import { seriesLineData } from "./config.ts";
import { cloneDeep } from "lodash";

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
const seriesList = computed(() => {
  return props.optionData.series;
});
let activeName = ref(1);
let activeCollapseName = ref("series");
const xAxis = computed(() => props.optionData.xAxis);
const yAxis = computed(() => props.optionData.yAxis);
const legend = computed(() => props.optionData.legend);
const showAdd = computed(() => props.optionData.series.length < 3);
let startNum = seriesList.value.length;
const addSeries = () => {
  const { source, dimensions } = cloneDeep(props.optionData.dataset);
  const keys = Object.keys(source[0] || {});
  const diffArr = getDiff(keys, dimensions);
  let resetDimensions = dimensions.filter((val) => !!val);
  resetDimensions.push(diffArr[0]);
  props.optionData.dataset.dimensions = [...resetDimensions];
  seriesList.value.push(cloneDeep(seriesLineData));
  activeName.value = seriesList.value.length;
};
const deleteSeries = () => {
  if (seriesList.value.length === 1) return;
  seriesList.value.pop();
  const dimensions = cloneDeep(props.optionData.dataset.dimensions).filter(
    (val) => !!val
  );
  props.optionData.dataset.dimensions = [...dimensions];
  nextTick(() => {
    props.optionData.dataset.dimensions.pop();
    props.optionData.dataset.dimensions.push(null);
  });
  console.log(props.optionData, "optionData");
  activeName.value = seriesList.value.length;
};
</script>
