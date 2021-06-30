import { ref } from "@vue/reactivity";

const tooltipVisible = ref(true);

const toggleTooltips = () => {
  tooltipVisible.value = !tooltipVisible.value;
};

export { tooltipVisible, toggleTooltips };
