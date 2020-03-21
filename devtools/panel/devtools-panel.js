$('.ui.dropdown').dropdown();
const variableMenu = "#var .ui.selection.dropdown .menu";
const getBrowser = () => {
    const browserType = navigator.userAgent.toLowerCase();
    if(browserType.indexOf("chrome") != -1){
      return chrome;
    }else if(browserType.indexOf("firefox") != -1){
      return browser;
    }
}
const browsers = getBrowser();
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}
const LoadScript = async (script,callback) => {
    await browsers.runtime.sendMessage({
        tabId: browsers.devtools.inspectedWindow.tabId,
        script: readTextFile('/devtools/jquery-3.4.1.js')
    });
    await browsers.runtime.sendMessage({
        tabId: browsers.devtools.inspectedWindow.tabId,
        script: script
    },() => {
        callback();
    });
}
browsers.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "sendVariableContainer") {
        let d = JSON.parse(request.source.data);
        $(variableMenu).children().remove();
        for(let i = 0; i < d.Variables.length; i++) {
            $(variableMenu).append('<div class="item" data-value="'+d.Variables[i].name+'">'+d.Variables[i].name+'</div>');
        }
    }
});
$(document).ready(() => {
    LoadScript(`$.getScript('https://raw.githack.com/EntryJSers/EntryDevTools/master/devtools/registerObject.js'); undefined;`, async () => {
        // Call it twice bcoz it has bug
        setTimeout(async () => {
            await browsers.runtime.sendMessage({action: "readVariables"});
            setTimeout(() => {browsers.runtime.sendMessage({action: "readreadVariablesDom"})},200);
        },200);
    });

    $('.variable_refresh').click(() => {
        LoadScript(`$.getScript('https://raw.githack.com/EntryJSers/EntryDevTools/master/devtools/registerObject.js');
                    undefined;
                    `,
        async () => {
            // Call it twice bcoz it has bug
            setTimeout(async () => {
                await browsers.runtime.sendMessage({action: "readVariables"});
                setTimeout(() => {browsers.runtime.sendMessage({action: "readreadVariablesDom"})},200);
            },200);
        });
    });

    $('.variable_apply').click(() => {
        LoadScript(`$.getScript('https://raw.githack.com/EntryJSers/EntryDevTools/master/devtools/registerObject.js');
                    undefined;
                    `,
        async () => {
            // Call it twice bcoz it has bug
            setTimeout(async () => {
                await browsers.runtime.sendMessage({action: "readVariables"});
                setTimeout(() => {browsers.runtime.sendMessage({action: "readreadVariablesDom"})},200);
            },200);
        });
    });
});
