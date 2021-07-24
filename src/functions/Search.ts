import { ref } from "@vue/reactivity";

const searchMode = ref<boolean>(false);
const search = ref<string>("");

const enableSearch = () => {
    searchMode.value = !searchMode.value;
    search.value = "";
    // deleteVisible.value = false;
    // popupVisible.value = false;
    // markerPopupVisible.value = false;
  };

export { searchMode, search, enableSearch }