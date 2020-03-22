browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "readObject") sendResponse({data:document.body.getAttribute('entrydevtools')});
});
