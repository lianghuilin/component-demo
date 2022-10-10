<template>
  <span class="aniamte-number-wrapper">
    <animate-number
      ref="animateNum"
      mode="AUTO"
      :style="`color:${numberColor};font-size:${numberSize}px`"
      :from="option.from"
      :to="option.dataset"
      :duration="duration"
      :formatter="numberFormatter"
    ></animate-number>
  </span>
</template>

<script setup>
import { toRefs, reactive, watch, ref } from "vue";
import AnimateNumber from "./component/AnimateNumber.vue";
import { animateNumFormatter } from "@util/formatter-number";
import { cloneDeep } from "lodash";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});
const option = reactive({
  from: 0,
  dataset: 0,
});
let { duration, numberSize, numberColor, isNeedFormatter } = toRefs(
  props.chartConfig.option
);
const animateNum = ref(null);
const animateNumStart = (from, to) => {
  if (animateNum.value) {
    animateNum.value.start({
      from: { x: from },
      to: { x: to },
      duration: duration.value,
      easing: "easeOutQuad",
    });
  }
};
watch(
  () => props.chartConfig.option.from,
  () => {
    option.from = props.chartConfig.option.from;
    animateNumStart(option.from, option.dataset);
  },
  { immediate: true }
);

watch(
  () => props.chartConfig.option.dataset,
  (newDataset, oldDataset) => {
    option.dataset = newDataset;
    option.from = oldDataset;
    animateNumStart(option.from, option.dataset);
  },
  { immediate: true }
);
const numberFormatter = (num) => {
  return isNeedFormatter.value ? animateNumFormatter(num) : num;
};
</script>
