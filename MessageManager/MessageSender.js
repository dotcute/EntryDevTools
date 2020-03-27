browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "readMessages") sendResponse({data:document.body.getAttribute('entrydevtools')});
});
