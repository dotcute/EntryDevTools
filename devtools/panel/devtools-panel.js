$('#var .ui.dropdown').dropdown();
$('#list .ui.dropdown').dropdown();
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
    if(request.action == "sendObjectContainer") {
        let d = JSON.parse(request.source.data);
        $(variableMenu).children().remove();
        for(let i = 0; i < d.Variables.length; i++) {
            $(variableMenu).append('<div class="item" data-value="'+d.Variables[i].name+'">'+d.Variables[i].name+'</div>');
        }
    }
});
let VariableReloader;
$(document).ready(() => {
    $('.variable_apply').click(() => {
        LoadScript(`$.get('https://raw.githubusercontent.com/EntryJSers/EntryDevTools/master/ObjectManager/VariableChanger.js',d=>{
                        $(document.head).append('<script>'+d.replace('%0','${$('.input_variable').val().toString()}').replace('%1','${$('.variable_text').val().toString()}')+'</script>');
                    });`);
    });

    ObjectReloader = setInterval(() => {
        LoadScript(`$.getScript('https://rawcdn.githack.com/EntryJSers/EntryDevTools/a6273ccc962bf7a35019cb4eb0142467454c9edb/ObjectManager/registerObject.js');
                    undefined;
                    `,
        async () => {
            // Call it twice bcoz it has bug
            setTimeout(async () => {
                await browsers.runtime.sendMessage({action: "readObject"});
                setTimeout(() => {browsers.runtime.sendMessage({action: "readObject"})},300);
            },200);
        });
    },1000);
});
