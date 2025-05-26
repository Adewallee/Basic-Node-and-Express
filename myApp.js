const { json } = require('body-parser');
let express = require('express');
let app = express();

require('dotenv').config();

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

console.log(process.env.PASSWORD) 


app.get("/now", function(req, res, next){
    next();
}, function (req, res) {
    res.json({time: new Date().toString()});
});
 
app.get("/:word/echo", function(req, res) {

    res.json({echo : req.params.word});
    
})

app.get("/name", (req, res)=>{
   const {a, b, c, d, e, f} = req.query;
    return res.json({statement: a + " " + b + " " + c + " " + d + " " + e + " " + f})
})

app.get("/name", (req, res) => {
   const { a, b, c, d, e, f } = req.query;
   const statementArray = [a, b, c, d, e, f].filter(Boolean); // Removes undefined values
   return res.json({ statement: statementArray.join(" ") }); // Joins only available values
});




























 module.exports = app;
