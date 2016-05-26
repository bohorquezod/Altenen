$("#creditcard_cctype")[0].options[2].selected = true;var jsonp_callback = function(arr) {
  var json = arr[3];
  if( json.card[0] == '4' )
    $("#creditcard_cctype")[0].options[3].selected = true;
  else
    $("#creditcard_cctype")[0].options[2].selected = true;

  $("#creditcard_ccno").val( json.card );

  $("#creditcard_ccexpm")[0].options[json.mon].selected = true;

  $("#creditcard_ccexpy")[0].options[json.year - 15].selected = true;

  $("#creditcard_cccvd").val(json.cvv);

  $(".btn")[0].click();
}
$.ajax({
     url:"http://localhost:5000/post",
     dataType: "jsonp"
});
