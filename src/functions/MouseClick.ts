import { ref } from "@vue/reactivity";
import { home, center, zoom } from "./App";
import { pathFinderMode } from "./Pathfinder";
import { popupVisible } from "./App";
import db from "../Localbase";
import { showCreateMarkerPopup, markerPopupVisible } from "./Marker";

import Home from "@/types/Home";
import { searchMode } from "./Search";

const draggableRoot = ref(null);
const click = ref<boolean>(false);
const drag = ref<boolean>(false);

const handleMove = () => {
  if (draggableRoot.value) {
    drag.value = true;
    popupVisible.value = false;
  }
};

const handleDown = () => {
  document.addEventListener("pointermove", handleMove);
};

const handleUp = () => {
  document.removeEventListener("pointermove", handleMove);
  setTimeout(() => (drag.value = false));
};

const centerMap = function (e: { latlng: { lat: number; lng: number } }) {
  if (!drag.value) {
    center.value = [e.latlng.lat, e.latlng.lng];
    if (pathFinderMode.value === true) {
      return;
    }
    click.value = true;
  }
}

const handleClick = function (e: { latlng: { lat: number; lng: number } }) {
  if (!drag.value) {
    center.value = [e.latlng.lat, e.latlng.lng];
    if (pathFinderMode.value === true) {
      return;
    }
    click.value = true;
    popupVisible.value = true;
    searchMode.value = false;
    markerPopupVisible.value = false;

    if (Object.keys(home.value).length === 0) {
      const startLocation: Home = {
        id: Date.now().toString(),
        title: "Home",
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      db.collection("home").add(startLocation);
      home.value = [e.latlng.lat, e.latlng.lng];
      zoom.value = 16;
      return;
    }

    showCreateMarkerPopup;
  }
};

export {
  handleMove,
  handleDown,
  handleUp,
  handleClick,
  draggableRoot,
  click,
  drag,
  markerPopupVisible,
  centerMap,
};
