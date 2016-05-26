// Altenen
var td = document.querySelectorAll("div.threadinfo");
var title = "";
var cards = [];

for( var i = 0; i < td.length; i ++ ) {
  var json = {};
  title = td[i].title;

  json.card = /[\d]{16}/.exec(title);
  
  if( json.card ) {
    json.card = json.card[0];
    title = title.replace(json.card, "");
  }

  json.year = /20[1-2]\d/.exec(title);

  if( json.year != null ) {
    json.year = json.year[0];
    title = title.replace(json.year, "");
    json.year = json.year.replace("20", "");
  }

  json.cvv = /[\d]{3}/.exec(title);

  if( json.cvv != null ) {
    json.cvv = json.cvv[0];
    title = title.replace(json.cvv, "");
  }

  json.mon = /[\d]{2}/.exec(title);

  if( json.mon != null ) {
    json.mon = json.mon[0];
    title = title.replace(json.mon, "");
  }

  if( !json.year ) {
    json.year = /[\d]{2}/.exec(title);

    if( json.year != null ) {
      json.year = json.year[0];
      title = title.replace(json.year, "");
    }
  }

  json.mon = Number(json.mon);
  json.year = Number(json.year);

  if( json.mon <= 0 || json.mon > 12 ) {
    json.mon = null;
  }

  if( json.card && json.cvv && json.year && json.mon )
    cards.push(json);
}

var strJson = JSON.stringify(cards);
alert(strJson);
// Altenen

