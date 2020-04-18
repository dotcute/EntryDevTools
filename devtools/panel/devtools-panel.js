$('#var .ui.dropdown').dropdown();
$('#list .ui.dropdown').dropdown();
$('#msg .ui.dropdown').dropdown();
$('#script .ui.dropdown').dropdown();
$('textarea.autosize').on('keydown keyup', function () {
    $(this).height(1).height($(this).prop('scrollHeight') - 22);
});
const variableMenu = '#var .ui.selection.dropdown .menu';
const listMenu = '#list .ui.selection.dropdown .menu';
const messageMenu = '#msg .ui.selection.dropdown .menu';
const getBrowser = () => {
    const browserType = navigator.userAgent.toLowerCase();
    if (browserType.indexOf('chrome') != -1) {
        return chrome;
    } else if (browserType.indexOf('firefox') != -1) {
        return browser;
    }
};
const browsers = getBrowser();
const readTextFile = (file) => {
    const rawFile = new XMLHttpRequest();
    let allText;
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
    return allText;
};
const LoadScript = async (script, callback) => {
    await browsers.runtime.sendMessage({
        tabId: browsers.devtools.inspectedWindow.tabId,
        script: readTextFile('/devtools/jquery-3.4.1.js'),
    });
    await browsers.runtime.sendMessage({
        tabId: browsers.devtools.inspectedWindow.tabId,
        script: script,
    }, () => {
        callback();
    });
};
const evalCode = (code) => {
    browser.devtools.inspectedWindow.eval(code);
};

let pjktId;

browsers.runtime.onMessage.addListener((request) => {
    if (request.action == 'sendObjectContainer') {
        const d = JSON.parse(request.source.data);
        pjktId = d.ID;
        console.log(d.ID);
        $(variableMenu).children().remove();
        for (let i = 0; i < d.Variables.length; i++) {
            $(variableMenu).append('<div class="item" data-value="' + d.Variables[i].name + '">' + d.Variables[i].name + '</div>');
        }
        $(listMenu).children().remove();
        for (let i = 0; i < d.Lists.length; i++) {
            $(listMenu).append('<div class="item" data-value="' + d.Lists[i].name + '">' + d.Lists[i].name + '</div>');
        }
        $(messageMenu).children().remove();
        for (let i = 0; i < d.Messages.length; i++) {
            $(messageMenu).append('<div class="item" data-value="' + d.Messages[i].id + '">' + d.Messages[i].name + '</div>');
        }
    }
});

$(document).ready(() => {
    $('.variable_apply').click(() => {
        LoadScript(`$.get('https://raw.githubusercontent.com/EntryJSers/EntryDevTools/master/ObjectManager/VariableChanger.js',d=>{
            $(document.head).append('<script>'+d.replace('%0','${$('.input_variable').val().toString()}').replace('%1','${$('.variable_text').val().toString()}')+'</script>');
        });`);
        $('.variable_text').val('');
    });

    $('.message_raise').click(() => {
        console.log($('.input_message').val().toString());
        LoadScript(`$.get('https://raw.githubusercontent.com/EntryJSers/EntryDevTools/master/ObjectManager/MessageRaiser.js', d=> {
            $(document.head).append('<script>'+d.replace('%0','${$('.input_message').val().toString()}')+'</script>');
        });`);
    });

    $('.list_apply').click(() => {
        console.log($('.list_input_array').val().split('\n'));
        const script = `$.get('https://raw.githubusercontent.com/EntryJSers/EntryDevTools/master/ObjectManager/ListChanger.js', d=> {
            $(document.head).append('<script>'+d.replace('%0','${$('.input_list').val().toString()}').replace('%1',\`${$('.list_input_array').val() == '' ? '[]' : JSON.stringify($('.list_input_array').val().split('\n')).replace(/`/gi, '\\\\"').replace(/"/gi, '\\"')}\`)+'</script>');
        });`;
        console.log(script);
        LoadScript(script);
        $('.list_input_array').val('');
    });

    $('.list_valueofindex_apply').click(() => {
        console.log($('.list_input_valueofindex_text').val().toString());
        const script = `$.get('https://raw.githubusercontent.com/EntryJSers/EntryDevTools/master/ObjectManager/ListValueOfIndexChanger.js', d=> {
            $(document.head).append('<script>'+d.replace('%0','${$('.input_index_list').val().toString()}').replace('%1','${$('.list_input_index').val().toString()}').replace('%2',"{data:'${$('.list_input_valueofindex_text').val().toString()}'}")+'</script>');
        });`;
        console.log(script);
        LoadScript(script);
        $('.list_input_valueofindex_text').val('');
    });

    $('.script_install').click(() => {
        const userScriptType = $('.input_script').val().toString();
        if (userScriptType == 'gyelanmali') {
            evalCode('$.get(\'https://gyelanmal-i.web.app/index.prod.js\')');
        } else if (userScriptType == 'jevi') {
            evalCode('$(\'script\').load(\'https://entjevi.herokuapp.com/install\')');
        } else if (userScriptType == 'liveentry') {
            evalCode('$(\'script\').load(\'https://liveentry.herokuapp.com/install\')');
        } else if (userScriptType == 'enttube') {
            evalCode('$.get(\'https://raw.githack.com/thoratica/EntTube/master/EntTube.min.js\')');
        }
    });

    $('.print').click(() => {
        if (pjktId == undefined) return $('#saveFirst').show();
        const win = window.open(`https://playentry.org/print/${pjktId}`, '_blank');
        win.focus();
        $('#saveFirst').hide();
    });

    // eslint-disable-next-line no-undef
    ObjectReloader = setInterval(() => {
        LoadScript(`$.getScript('https://rawcdn.githack.com/EntryJSers/EntryDevTools/master/ObjectManager/registerObject.js');
                    undefined;
                    `,
            async () => {
                setTimeout(async () => {
                    await browsers.runtime.sendMessage({ action: 'readObject' });
                    setTimeout(() => {
                        browsers.runtime.sendMessage({ action: 'readObject' });
                    }, 300);
                }, 200);
            });
    }, 1000);
});