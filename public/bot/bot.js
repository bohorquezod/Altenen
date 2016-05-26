var baseUrl = "localhost";

var botName = document.domain.replace("www.", "");
if( !botName )
    botName = prompt("Escriba el nombre del bot");
console.log(botName);

var options = {
     url:"http://localhost:5000/bot/" + botName + ".js",
     dataType: "jsonp"
};

var foo = function() {
	$ = a;
	jQuery.ajax(options);
};

if( window.jQuery )
	jQuery.ajax(options);
else {
	alert("Necesitas incluir jquery.js y luego pegar este script nuevamente");
}
/*
try {
	if(jQuery)
		jQuery.ajax(options);

} catch( e ) {
	try {
		if(window.$)
			var a = $;
	} catch( e ) {
		null;
	}
	var script = document.createElement('script');
	script.src = 'http://localhost:5000/bot/jquery.js?callback=foo'
	document.body.appendChild(script);
}*/