const getBrowser = () => {
  const browserType = navigator.userAgent.toLowerCase();
  if(browserType.indexOf('chrome') != -1){
    return chrome;
  }else if(browserType.indexOf('firefox') != -1){
    return browser;
  }
};
const browsers = getBrowser();

const handleMessage = async (req) => {
  if (req.action == 'readObject') {
    await browsers.tabs.executeScript(null, {file:'../ObjectManager/ObjectSender.js'});
    await browsers.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      await browsers.tabs.sendMessage(tabs[0].id, {action: 'readObject'}, (response) => {
          browsers.runtime.sendMessage({action: 'sendObjectContainer', source:response});
      });
    });
  }

  if(req.script) browsers.tabs.executeScript(req.tabId, {code: req.script});

};

browsers.runtime.onMessage.addListener(handleMessage);
