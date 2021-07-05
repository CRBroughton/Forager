import { ref } from "@vue/reactivity";

const tooltipVisible = ref<boolean>(true);
const donationPopupVisible = ref<boolean>(false);

const toggleTooltips = () => {
  tooltipVisible.value = !tooltipVisible.value;
};

export { tooltipVisible, toggleTooltips, donationPopupVisible };
