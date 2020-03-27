if ('%0' == 'gyelanmali') {
    $.get('https://gyelanmal-i.web.app/index.prod.js');
} else if ('%0' == 'jevi') {
    $('script').load('https://entjevi.herokuapp.com/install'); 
} else if ('%0' == 'liveentry') {
    $('script').load('https://liveentry.herokuapp.com/install');
};