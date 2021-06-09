module.exports = {
  pwa: {
    themeColor: "#ffffff",
    verbose: true,
    cacheId: "Forager",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
    },
  },
};
