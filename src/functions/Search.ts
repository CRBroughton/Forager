import { ref } from "@vue/reactivity";

const searchMode = ref<boolean>(false);

const enableSearch = () => {
    searchMode.value = !searchMode.value;
    console.log("Search mode ", searchMode.value)
    // deleteVisible.value = false;
    // console.log("PATHFINDER :", pathFinderMode.value);
    // popupVisible.value = false;
    // markerPopupVisible.value = false;

  };

export { searchMode, enableSearch }