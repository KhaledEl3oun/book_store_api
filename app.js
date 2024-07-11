const dotenv = require("dotenv")
dotenv.config({path:'config.env'});
const express = require("express");
const bookPath = require('./Routes/books')
const authorsPath = require('./Routes/authors');
const authPath = require('./Routes/auth');
const mongoose = require('mongoose');
const logger = require("./middlewares/Logger")
const errorHandler = require("./middlewares/error")

mongoose
.connect("mongodb://localhost/bookStoreDB")
.then(() => { console.log("connected to mongoDB...");})
.catch((error) => {console.log("connection field to mongoDB", error);})
// init express
const app = express();

// apply middleware
app.use(express.json());
app.use(logger)

// routes
app.use('/api/books', bookPath)
app.use('/api/authors', authorsPath)
app.use('/api/auth', authPath)

//error handle middleware
// app.use((req,res,next) => {
//     const error = new Error(`Not found - ${req.originalUrl}`);
//     res.status(404);
//     next(error)
// })

app.use(errorHandler);


const port = process.env.PORT ||5000;
app.listen(port, ()=> console.log(`server is running on port${port}`))