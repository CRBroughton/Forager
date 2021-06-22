import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import './index.css'

import { LMap, LTileLayer, LMarker, LTooltip, LPolyline } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

const app = createApp(App)

app.component("l-map", LMap);
app.component("l-tile-layer", LTileLayer);
app.component("l-marker", LMarker);
app.component("l-tooltip", LTooltip);
app.component("l-polyline", LPolyline);

app.mount("#app");