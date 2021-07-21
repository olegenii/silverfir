var express = require('express');
var whois = require('node-whois');
var router = express.Router();

var index = require("./index.js");
var bodyParser = require('body-parser');
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});



var app = express();
var port = 8081;

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});


router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

router.get('/createDirectory', function (req, res) {
    
    res.send(JSON.stringify({ created: "OK" }))

});

router.get('/data', function(req,res){
  res.contentType('text/plain');

    whois.lookup('olegen.ru', function(err, data) {
        res.send(data)
    });
});

router.get('/bond', function(req,res){
    res.contentType('text/html'); 
    res.sendFile(__dirname + '/bond_search.html');
});

router.post('/bond_new', urlencodedParser, function(req,res){
  getHTML(showHtml,res,req.body.bidFrom,req.body.bidTill,req.body.dateFrom,req.body.dateTill,req.body.bondLevel,req.body.isOffer);
});

function showHtml(res){
    res.sendFile(__dirname + '/bond_search.html')
};

async function getHTML(callback){
    await index.start(arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
    callback(arguments[1]);
};

router.get('/bond_new', function(req,res){
    res.contentType('text/html');
    getHTML(showHtml,res);
});

app.use(express.static(__dirname));
app.use('/', router);

app.listen(port, function () {
    console.log('server running at http://localhost:%s', port);
});
