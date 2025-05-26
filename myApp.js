const bodyParser = require('body-parser');
const { json } = require('body-parser');
let express = require('express');
const { log } = require('fcc-express-bground');
var app = express();

require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

console.log("Hello World");

app.get("/", (req, res) => {
    res.send('Hello Express');
});

app.get("/", (req, res) => { 
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();

    app.use(bodyParser.json());
})

app.get("/json", (req, res) => {

    if (process.env.MESSAGE_STYLE === "uppercase") {
        return res.json({message: "HELLO JSON"});
    }
    
    
    return res.json({message: "Hello json"});
});

function getTheCurrentTimeString(){
    return new Date().toString();
};

app.get("/now", function(req, res, next){
    req.time = getTheCurrentTimeString();
    next();
}, function (req, res) {
    res.json({time: req.time });
});


app.get("/now", function(req, res, next){
    next();
}, function (req, res) {
    res.json({time: new Date().toString()});
});
 
app.get("/:word/echo", function(req, res) {

    res.json({echo : req.params.word});
    
})

app.get("/name", (req, res)=>{
   const {first, last} = req.query;
    return res.json({statement: first + " " + last})
})






























 module.exports = app;
