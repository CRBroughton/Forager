import { ref } from "@vue/reactivity";
import { center, deleteVisible, path, popupVisible } from "./App";
import { markerPopupVisible } from "./Marker";
import { searchMode } from "./Search";

const pathFinderMode = ref<boolean>(false);
const result = ref<number>();
const lat1 = ref<number>();
const lat2 = ref<number>();
const lng1 = ref<number>();
const lng2 = ref<number>();
const distance = ref<number>(0);
const distanceMiles = ref<number>(0);

const enablePathFinder = () => {
  searchMode.value = false;
  pathFinderMode.value = !pathFinderMode.value;
  deleteVisible.value = false;
  console.log("PATHFINDER :", pathFinderMode.value);
  popupVisible.value = false;
  markerPopupVisible.value = false;
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

const runPathFinder = function (e: { latlng: { lat: number; lng: number } }) {
  center.value = [e.latlng.lat, e.latlng.lng];
  const tempLoc: Array<number> = [center.value[0], center.value[1]];
  path.value.leafletObject.addLatLng(tempLoc);

  if (!lat1.value) {
    lat1.value = tempLoc[0];
    lng1.value = tempLoc[1];
    return;
  }

  if (!lat2.value) {
    lat2.value = tempLoc[0];
    lng2.value = tempLoc[1];
    pathFinderCalc();
  }

  if (lat1.value) {
    lat1.value = tempLoc[0];
    lng1.value = tempLoc[1];
    lat2.value = null;
    lng2.value = null;
  }

  return;
};

const pathFinderCalc = () => {
  const p = 0.017453292519943295; // Math.PI / 180
  const c: (x: number) => number = Math.cos;
  const a: number =
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

export {
  pathFinderMode,
  result,
  lat1,
  lat2,
  lng1,
  lng2,
  distance,
  distanceMiles,
  enablePathFinder,
  pathFinderCalc,
  runPathFinder,
};
