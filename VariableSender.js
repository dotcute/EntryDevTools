browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "readVariables") sendResponse({data:document.body.getAttribute('entrydevtools')});
});
