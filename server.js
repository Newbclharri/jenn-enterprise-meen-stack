//////////////////DEPENDENDCIES////////////////

// Load .env contents into process.env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const indexRoute = require("./src/routes/index")
const port = process.env.PORT || 4000;

///////////////USE MIDDLEWARE//////////////////
app.use(cors()); // Allow all origins;
app.use(morgan("dev")); // Log all request and outcomes to the server

app.use("/", indexRoute); // Mount the specified route to the "/" path

app.listen(port, ()=>{
    console.log(`Jenn Enterprise Server listening on port ${port}`);
})