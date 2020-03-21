
const getBrowser = () => {
  const browserType = navigator.userAgent.toLowerCase();
  if(browserType.indexOf("chrome") != -1){
    return chrome;
  }else if(browserType.indexOf("firefox") != -1){
    return browsers;
  }
}
const browsers = getBrowser();

const handleMessage = async (req, sender, sendResponse) => {

  // if (sender.url != browsers.runtime.getURL("/devtools/panel/panel.html")) {
  //   return;
  // }

  if (req.action == "readVariables") {
    await browsers.tabs.executeScript(null,{file:"../VariableManager/VariableSender.js"});
    await browsers.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      await browsers.tabs.sendMessage(tabs[0].id, {action: "readVariables"}, (response) => {
          console.log(response);
          browsers.runtime.sendMessage({action: "sendVariableContainer",source:response});
      });
    });
  }

  if(req.script) browsers.tabs.executeScript(req.tabId,{code: req.script});

}

browsers.runtime.onMessage.addListener(handleMessage);
