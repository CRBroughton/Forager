import { ref } from "@vue/reactivity";
import { click } from "./MouseClick";
import { center, popupVisible, deleteVisible, path }  from "./App";
import { lat1, lat2, lng1, lng2, pathFinderCalc, pathFinderMode } from "./Pathfinder";
import { tooltipVisible } from "./SideMenu";

import db from "../Localbase";

const markers = ref([]);
const brSpace = ref("<br>");

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

  const createMarker = function (input) {
    if (input.value === "") {
      alert("Please enter a object name!");
      return;
    }
    const event = new Date();
    const newMarker = {
      date: event.toDateString(),
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

  const deleteMarker = function (e: {
    latlng: { lat: number; lng: number };
  }) {
    center.value = [e.latlng.lat, e.latlng.lng];
    if (pathFinderMode.value === true) {
      const tempLoc = [center.value[0], center.value[1]];
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
    }

    click.value = true;
    popupVisible.value = false;
    deleteVisible.value = true;
    db.collection("markers").doc(e.latlng).delete();

    const filteredMarkers = markers.value.filter(function (el: {
      lat: number;
      lng: number;
    }) {
      return el.lat != e.latlng.lat && el.lng != e.latlng.lng;
    });
    markers.value = filteredMarkers;
  };


export { markers, tooltipVisible, brSpace, showCreateMarkerPopup, toggleMarkerPopup, hideDeletePopup, createMarker, deleteMarker };
