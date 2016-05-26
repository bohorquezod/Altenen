var jsonp_callback = function(arr) {
  var card = arr[0];
  if( card.card[0] == '4' )
    $("#cardtype").val( "visa" );
  else if( card.card[0] == '5' )
    $("#cardtype").val( "masterCard" );
  else if( card.card[0] == '6' )
    $("#cardtype").val( "americanExpress" );

  $("#creditCardNumber").val( card.card );

  $("#creditCardMonth").val( card.mon );

  $("#creditCardYear").val("20" + card.year);

  $("#creditCardCVV").val(card.cvv);

  $("#submitOrderAnchor").click();
}
$.ajax({
     url:"http://localhost:5000/post",
     dataType: "jsonp"
});
