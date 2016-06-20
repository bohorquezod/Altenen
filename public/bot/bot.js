var baseUrl = "altenen.herokuapp.com";

var botName = document.domain.replace("www.", "");
if( !botName )
    botName = prompt("Escriba el nombre del bot");
console.log(botName);

var options = {
     url:"https://" + baseUrl + "/bot/" + botName + ".js",
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