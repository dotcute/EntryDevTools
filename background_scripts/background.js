
const getBrowser = () => {
  const browserType = navigator.userAgent.toLowerCase();
  if(browserType.indexOf("chrome") != -1){
    return chrome;
  }else if(browserType.indexOf("firefox") != -1){
    return browser;
  }
}
const browsers = getBrowser();
const handleMessage = (request, sender) => {

  if (sender.url != browsers.runtime.getURL("/devtools/panel/panel.html")) {
    return;
  }

  browsers.tabs.executeScript(
    request.tabId,
    {
      code: request.script
    });

}

browsers.runtime.onMessage.addListener(handleMessage);
