const handleError = (error) => {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}
const handleResult = (result) => { 
  if (result[1]) {
    handleError(result[1]);
  }
}
document.getElementById("button_jevi").addEventListener("click", () => {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: `$('script').load('https://liveentry.herokuapp.com/install');`
  });
});
