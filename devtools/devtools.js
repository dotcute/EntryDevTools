const getBrowser = () => {
  const browserType = navigator.userAgent.toLowerCase();
  if (browserType.indexOf('chrome') != -1) {
    return chrome;
  } else if (browserType.indexOf('firefox') != -1) {
    return browser;
  }
};
const browsers = getBrowser();

const handleShown = () => {
  console.log('panel is being shown');
};

const handleHidden = () => {
  console.log('panel is being hidden');
};

browsers.devtools.panels.create(
  '엔트리',
  '/icons/logo.png',
  '/devtools/panel/panel.html',
  (newPanel) => {
    newPanel.onShown.addListener(handleShown);
    newPanel.onHidden.addListener(handleHidden);
  });
