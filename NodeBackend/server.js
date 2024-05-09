const express = require('express');
const connectDb = require('./connection/dbconnection');
const cors = require('cors');
const http =require('http');



// dotenv file
require('dotenv').config({path:"./config.env"});

// setting port
const PORT = process.env.PORT || 8080;

// creating express instant and server
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

// using database connection

connectDb();

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shuting down the server due to uncaught exception`);
    process.exit(1);
})


// routes
const user = require('./router/router');
const report = require("./router/reportRoutes")

app.use('/api',user);
app.use('/user',report)




server.listen(PORT, ()=>{
    console.log(`Srever is running on http://localhost:${PORT}`)
})




//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`${err.message}`);
    console.log(`Shuting down the server due to Unhandled Promise Rejections`);
    server.close(()=>{
        process.exit(1);
    })

});