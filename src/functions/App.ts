import { ref } from "@vue/reactivity";
import { drag } from "./MouseClick";

const loading = ref(true);
const home = ref([]);
const center = ref([46.237820128136654, -22.141468687768604]);
const zoom = ref(2);
const popupVisible = ref(false);
const deleteVisible = ref(false);
const path = ref();
const version = ref("1.0.3");

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
    navigator.geolocation.getCurrentPosition(function(location) {
      center.value = [location.coords.latitude, location.coords.longitude];
      zoom.value = 16;
    },
    function (error) {
     if (error.code == error.PERMISSION_DENIED ) {
       console.log(error)
    };
  });
}

export { loading, home, center, zoom, popupVisible, deleteVisible, path, version, updateLoading, centerUpdate, getGPS };
