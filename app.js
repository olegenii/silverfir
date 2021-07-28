var express = require('express');
var whois = require('node-whois');
var fs = require("fs")
var router = express.Router();

var index = require("./in/index.js");
var bodyParser = require('body-parser');
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});



var app = express();
var port = 8081;

router.use((req,res,next)=>{
  console.log('/' + req.method);
  next();
});


//router.get('/', function (req, res) {
//    var myReadStream = fs.createReadStream(__dirname + '/in/index.html');
//    myReadStream.pipe(res);
//    //res.sendFile(__dirname + '/index.html')
//})

router.get('/',(req, res)=>{
    //res.sendFile(__dirname + '/in/index.html')
    var myReadStream = fs.createReadStream(__dirname + '/in/index.html');
    myReadStream.pipe(res);
})

router.get('/createDirectory',(req, res)=>{
    res.send(JSON.stringify({ created: "OK" }))
});

router.get('/data', (req,res)=>{
    res.contentType('text/plain');
    whois.lookup('olegen.ru',(err, data)=>{
        res.send(data)
    });
});

router.get('/bond', (req,res)=>{
    //res.contentType('text/html'); 
    //res.sendFile(__dirname + '/out/bond_search.html');
    var myReadStream = fs.createReadStream(__dirname + '/out/bond_search.html');
    myReadStream.pipe(res);
});

router.post('/bond_new', urlencodedParser, (req,res)=>{
  getHTML(showHtml,res,req.body.bidFrom,req.body.bidTill,req.body.dateFrom,req.body.dateTill,req.body.bondLevel,req.body.isOffer,req.body.priceFrom,req.body.priceTill,req.body.volumeMore);
});

function showHtml(res){
    //res.sendFile(__dirname + '/out/bond_search.html')
    var myReadStream = fs.createReadStream(__dirname + '/out/bond_search.html');
    myReadStream.pipe(res);
};

async function getHTML(callback){
    await index.start(arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10]);
    callback(arguments[1]);
};

router.get('/bond_new',(req,res)=>{
    res.contentType('text/html');
    getHTML(showHtml,res);
});

app.use(express.static(__dirname));
app.use('/', router);

app.listen(port, function () {
    console.log('server running at http://localhost:%s', port);
});
