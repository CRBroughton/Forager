import db from "@/Localbase";
import { ref } from "@vue/reactivity";
import { markers } from "./Marker";

const optionsVisible = ref(false);

const toggleOptions = () => {
  optionsVisible.value = !optionsVisible.value;
};

const saveAsJSON = (data, name = "forager-markers-" + Date.now() + ".json") => {
  const a = document.createElement("a");
  a.download = name;
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(markers.value)], { type: "application/json" })
  );
  a.click();
};

function readSingleFile(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  const newMarkers = JSON.parse(contents);
  db.collection('markers').set(newMarkers);
  window.location.reload();
}

const importJSON = () => {
  document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);
};


export { toggleOptions, saveAsJSON, importJSON, readSingleFile, displayContents, optionsVisible };
