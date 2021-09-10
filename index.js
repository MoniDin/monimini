const express = require('express');
const app = express();
const routes = require('./routes/routes.js');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8008;
app.use(express.static(__dirname + '/public/'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
 
app.use(routes);

app.listen(PORT, () => console.log("running on http://localhost:" + PORT));