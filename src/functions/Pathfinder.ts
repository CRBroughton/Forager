import { ref } from "@vue/reactivity";
import { deleteVisible, path } from "./App";

const pathFinderMode = ref(false);
const result = ref();
const lat1 = ref();
const lat2 = ref();
const lng1 = ref();
const lng2 = ref();
const distance = ref(0);
const distanceMiles = ref(0);

const enablePathFinder = () => {
    pathFinderMode.value = !pathFinderMode.value;
    deleteVisible.value = false;
    console.log("PATHFINDER");
    if (pathFinderMode.value === false) {
      path.value.leafletObject.setLatLngs([]);
      result.value = 0;
      lat1.value = 0;
      lat2.value = 0;
      lng1.value = 0;
      lng2.value = 0;
      distance.value = 0;
      distanceMiles.value = 0;
    }
  };

  const pathFinderCalc = () => {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2.value - lat1.value) * p) / 2 +
      (c(lat1.value * p) *
        c(lat2.value * p) *
        (1 - c((lng2.value - lng1.value) * p))) /
        2;

    // conversion factor
    const factor = 0.621371;

    if (!distance.value) {
      distance.value = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = distance
      distanceMiles.value = distance.value * factor;
      return;
    }
    result.value = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = distance
    const journey = distance.value + result.value;
    distance.value = journey;
    distanceMiles.value = distance.value * factor;
  };

export { pathFinderMode, result, lat1, lat2, lng1, lng2, distance, distanceMiles, enablePathFinder, pathFinderCalc };