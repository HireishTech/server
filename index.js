const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database Connected Successfully'))
.catch((err) => console.error(err+'Database Connection Failed'));

app.get("/",(req, res)=>{
    res.send("Welcome to Hireish Server");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log("server is running on port "+PORT));