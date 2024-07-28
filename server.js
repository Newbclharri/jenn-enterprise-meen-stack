////////////////// DEPENDENDCIES ////////////////

// Load .env contents into process.env
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts")
const indexRoute = require("./src/routes/index")
const port = process.env.PORT || 4000;
const connectDb = require('./src/connection');

////////////// CONFIG EXPRESS SETTINGS /////////////
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

/////////////// USE MIDDLEWARE //////////////////
app.use(cors()); // Allow all origins;
app.use(morgan("dev")); // Log all request and outcomes to the server
app.use(expressLayouts)


// Establish database connection
connectDb()

//////////////// ROUTE HANDLERS ///////////////

app.use("/", indexRoute); // Mount the specified route to the "/" path

app.listen(port, ()=>{
    console.log(`Jenn Enterprise Server listening on port ${port}`);
})