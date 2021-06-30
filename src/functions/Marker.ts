import { ref } from "@vue/reactivity";
import { click, drag } from "./MouseClick";
import { center, popupVisible, deleteVisible } from "./App";
import { pathFinderMode, runPathFinder } from "./Pathfinder";
import { tooltipVisible } from "./SideMenu";

import db from "../Localbase";

const markers = ref([]);
const brSpace = ref("<br>");
const selectedMarker = ref();
const filteredMarkers = ref();
const markerPopupVisible = ref(false);
const event = new Date();

const showCreateMarkerPopup = () => {
  click.value = true;
  popupVisible.value = true;
};

const toggleMarkerPopup = () => {
  popupVisible.value = false;
  deleteVisible.value = false;
};

const hideDeletePopup = () => {
  deleteVisible.value = !deleteVisible.value;
};

const handleMarker = function (e: { latlng: { lat: number; lng: number } }) {
  popupVisible.value = false;
  if (!drag.value) {
    center.value = [e.latlng.lat, e.latlng.lng];
    if (pathFinderMode.value === true) {
      markerPopupVisible.value = false;
      runPathFinder(e);
      return;
    }
    markerPopupVisible.value = true;
    currentFilteredMarker(e);
  }
};

const createMarker = function (input) {
  if (input.value === "") {
    alert("Please enter a object name!");
    return;
  }
  const newMarker = {
    date: event.toDateString(),
    dateLastForaged: event.toDateString(),
    id: Date.now().toString(),
    title: input,
    lat: center.value[0],
    lng: center.value[1],
  };

  db.collection("markers").add(newMarker);
  markers.value.push(newMarker);
  popupVisible.value = false;
  deleteVisible.value = false;
};

const currentFilteredMarker = function (e: {
  latlng: { lat: number; lng: number };
}) {
  center.value = [e.latlng.lat, e.latlng.lng];

  click.value = true;
  popupVisible.value = false;
  deleteVisible.value = false;

  const filteredMarker = markers.value.filter(function (el: {
    lat: number;
    lng: number;
  }) {
    return el.lat === e.latlng.lat && el.lng === e.latlng.lng;
  });
  selectedMarker.value = filteredMarker;

  const filteredMarkersResult = markers.value.filter(function (el: {
    lat: number;
    lng: number;
  }) {
    return el.lat != e.latlng.lat && el.lng != e.latlng.lng;
  });
  filteredMarkers.value = filteredMarkersResult;
};

const deleteMarker = () => {
  click.value = true;
  popupVisible.value = false;
  db.collection("markers").doc({ id: selectedMarker.value[0].id }).delete();

  markers.value = filteredMarkers.value;
  markerPopupVisible.value = false;
};

const updateForage = () => {
  db.collection("markers").doc({id: selectedMarker.value[0].id}).update({
    dateLastForaged: event.toDateString(),
  })
  selectedMarker.value[0].dateLastForaged = event.toDateString();
  return;
};

export {
  markers,
  tooltipVisible,
  brSpace,
  selectedMarker,
  markerPopupVisible,
  popupVisible,
  showCreateMarkerPopup,
  toggleMarkerPopup,
  hideDeletePopup,
  createMarker,
  deleteMarker,
  currentFilteredMarker,
  handleMarker,
  updateForage,
};
