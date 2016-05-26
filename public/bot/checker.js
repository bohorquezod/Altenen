// Checker
var arr = JSON.parse(prompt("Put array here :3"));

var txt = "";

for( var i = 0; i < arr.length; i++ ) {
    arr[i].mon = arr[i].mon < 10 ? ("0" + arr[i].mon) : arr[i].mon;
    txt += arr[i].card + "|" + arr[i].mon + arr[i].year + "|" + arr[i].cvv;

    if( !(i == arr.length - 1) )
        txt += ", ";
 
}
$(".form-control")[0].value = txt;
$(".form-control")[1].value = 0.1;
$(".btn.btn-warning").click();
