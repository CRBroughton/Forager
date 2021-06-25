import { ref } from "@vue/reactivity";

const optionsVisible = ref(false);

const toggleOptions = () => {
    optionsVisible.value = !optionsVisible.value;
  };

export { toggleOptions, optionsVisible };