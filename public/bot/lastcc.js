// Cargar el socket
jQuery.ajax({
	url: "http://" + baseUrl + "/bot/socket.io.js",
	dataType: "jsonp"
});


// Recibir cc
var socket = io.connect('https://altenen.herokuapp.com');
socket.on('shareCCAll', function (data) {
	console.log(data);
});



// enviar cc
var socket = io.connect('http://altenen.herokuapp.com');
socket.emit('shareCCServer', { my: 'data' });



1face
gymshark
yolopido

about:config 
	websocket.allowInsecureFromHTTPS = false;
	mixed_content.block_display_content = false;