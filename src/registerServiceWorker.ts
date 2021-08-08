/* eslint-disable no-console */

import { register } from "register-service-worker";
import { applyUpdate, updateFound } from "@/functions/App";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
      updateFound.value = true;
    },
    updated(registration) {
      if (applyUpdate) {
        const worker = registration.waiting;
        worker.postMessage({ action: "SKIP_WAITING" });
        applyUpdate.value = false;
      }
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}

export { updateFound, applyUpdate }