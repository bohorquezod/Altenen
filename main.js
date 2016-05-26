var express = require("express");
var request = require("request")
var app = express();

app.listen(5000, function() {
	console.log("Servidor encendido");
})

var options = {
    uri: "http://www.altenen.com/",
    headers: {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0"
    }
};

app.get("/", function(req, res) {
	request.post(options, function(error, response, body) {
		res.send(body);
	})
});