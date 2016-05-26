var json = JSON.parse( prompt("Inserte la cc") );

jQuery("input.text.cc.dataRequired").val( json.card );

jQuery("select.month").val( Number( json.mon ) );

jQuery("select.year").val( "20" + json.year );

jQuery("input.text.pin.dataRequired").val( json.cvv );

jQuery(jQuery("#continueCheckout")[0]).click();