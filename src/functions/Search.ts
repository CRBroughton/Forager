import { ref } from "@vue/reactivity";
import { markers, filteredSearchMarkers } from "../functions/Marker";

const searchMode = ref<boolean>(false);
const search = ref<string>("");

const enableSearch = () => {
    search.value = "";
    filteredSearchMarkers.value = markers.value;
    searchMode.value = !searchMode.value;
    // deleteVisible.value = false;
    // popupVisible.value = false;
    // markerPopupVisible.value = false;
  };

export { searchMode, search, enableSearch }