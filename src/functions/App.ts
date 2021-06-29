import { ref } from "@vue/reactivity";
import { drag } from "./MouseClick";

const loading = ref(true);
const home = ref([]);
const center = ref([46.237820128136654, -22.141468687768604]);
const zoom = ref(2);
const popupVisible = ref(false);
const deleteVisible = ref(false);
const path = ref();
const version = ref("1.0.2");

const updateLoading = () => {
    loading.value = false;
    drag.value = false;
    popupVisible.value = false;
  };

  const centerUpdate = function (newCenter) {
    const tmpCenter = [newCenter.lat, newCenter.lng];
    center.value = tmpCenter;
  };

export { loading, home, center, zoom, popupVisible, deleteVisible, path, version, updateLoading, centerUpdate };
