const handleMessage = (request, sender) => {
 
  if (sender.url != browser.runtime.getURL("/devtools/panel/panel.html")) {
    return;
  }

  browser.tabs.executeScript(
    request.tabId, 
    {
      code: request.script
    });
  
}

browser.runtime.onMessage.addListener(handleMessage);