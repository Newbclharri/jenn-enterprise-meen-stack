////////////////// DEPENDENDCIES ////////////////

// Load .env contents into process.env
require("dotenv").config();

const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts")
const indexRoute = require(path.join(__dirname, 'src', 'routes', 'index.js'));
const adminRoute = require(path.join(__dirname, 'src', 'routes', 'adminRoute.js'));
const testRoute = require(path.join(__dirname, 'src','routes','testRoute.js'));
const port = process.env.PORT || 4000;
const connectDb = require(path.join(__dirname, 'src', 'connection.js'));

////////////// CONFIG EXPRESS SETTINGS /////////////
app.set("view engine", "ejs");
const viewsPath = path.join(__dirname,'src','views')
app.set("views", viewsPath);

/////////////// USE MIDDLEWARE //////////////////
app.use(cors()); // Allow all origins;
app.use(morgan("dev")); // Log all request and outcomes to the server
// app.use(express.static(path.join(__dirname,'src','public')));
app.use('/assets', express.static(path.join(__dirname, 'src', 'public')));
app.use(expressLayouts);
app.use(express.urlencoded({extended:true}));


// Establish database connection
connectDb()

//////////////// ROUTE HANDLERS ///////////////

// Home Page Route handlers
app.use("/", indexRoute); // Mount the specified route to the "/" path

// Admin route handlers
app.use("/admin", adminRoute);

// Test route handlers
app.use("/test", testRoute);



app.listen(port, ()=>{
    console.log(`Jenn Enterprise Server listening on port ${port}`);
})