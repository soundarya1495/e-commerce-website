require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8500;

const cors = require('cors');
app.use(cors());

var products = require('./products.json');

app.get('/getAllProducts', function(req, res){
  res.json(products);
  });

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;


mongoose.connect(MONGO_CONNECTION
    ).then(success =>{
        console.log("connected to mongodb");
    }).catch(error => {
        console.log("Error in connection" +error);
    })
app.listen(port, () =>{
    console.log('API is running in port' +port);
});

app.use(express.json());
const router= require("./routes/route")
app.use("/",router);
