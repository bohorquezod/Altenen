var url = "http://localhost:5000/post";
var jsonp_callback = function(arr) {

	var json = arr[4];

	$("input[name='onepage_customer']")[2].checked = true;

	$("input[name='card_number']").val(json.card);

	$("select[name='expmonth']")[0].options[ json.mon - 1 ].selected = true;

	$("select[name='expyear']")[0].options[ json.year - 14 ].selected = true

	$("input[name='cid']").val( json.cvv )

	$(".imgbutton[alt='Complete Checkout']").click()
}

$.ajax({
     url: url,
     dataType: "jsonp"
});
