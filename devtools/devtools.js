const handleShown = () => {
  console.log("panel is being shown");
}

const handleHidden = () => {
  console.log("panel is being hidden");
}

browser.devtools.panels.create(
  "엔트리",
  "/icons/logo.png",
  "/devtools/panel/panel.html"
).then((newPanel) => {
  newPanel.onShown.addListener(handleShown);
  newPanel.onHidden.addListener(handleHidden);
});