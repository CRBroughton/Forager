import { ref } from "@vue/reactivity";
import { drag } from "./MouseClick";

const loading = ref<boolean>(true);
const home = ref<number[]>([]);
const center = ref<number[]>([46.237820128136654, -22.141468687768604]);
const zoom = ref<number>(2);
const popupVisible = ref<boolean>(false);
const deleteVisible = ref<boolean>(false);
const path = ref<any>();
const version = ref<string>("1.0.4");

const updateLoading = () => {
  loading.value = false;
  drag.value = false;
  popupVisible.value = false;
};

const centerUpdate = function (newCenter) {
  const tmpCenter = [newCenter.lat, newCenter.lng];
  center.value = tmpCenter;
};

// Adds a small delay due to map not loading the center properly
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getGPS = async () => {
  await delay(1000);
  navigator.geolocation.getCurrentPosition(
    function (location) {
      center.value = [location.coords.latitude, location.coords.longitude];
      zoom.value = 16;
    },
    function (error) {
      if (error.code == error.PERMISSION_DENIED) {
        console.log(error);
      }
    }
  );
};

export {
  loading,
  home,
  center,
  zoom,
  popupVisible,
  deleteVisible,
  path,
  version,
  updateLoading,
  centerUpdate,
  getGPS,
};
