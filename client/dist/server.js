var express = require('express'); 
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;
var app = express();
//app.post('/',  function (req, res){ res.end('hello world'); });
app.listen(PORT);   
