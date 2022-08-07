const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./configs/db.config');
const user = require('./routes/User/user');

app.use('/', user);

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>console.log("server is running on port "+PORT));