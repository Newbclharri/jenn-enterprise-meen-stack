/////// DB CONNECTION MODULE ///////////

// Load .env variables to process.env
require('dotenv').config();

//imports mongoose package
const mongoose = require('mongoose');

// Load connection string
const MONGO_DB_URI = process.env.MONGO_DB_URI;


/**
 * Establishes a connection to the MongoDB server cluster instance.
 * Sets up event listeners to monitor and log the connection state.
 * Handles initial connection to the database using the provided connection string.
 * 
 * @returns {Promise<mongoose.Connection>} - The Mongoose connection object.
 */
async function connectToDb() {
    const dbConnection = mongoose.connection;

    // Setup event listeners to monitor connection state
    dbConnection
        .on('error', (err) => console.log(`Error during connection: ${err.stack}`))
        .on('disconnected', () => console.log("Db server disconnected."))
        .on('reconnected', () => console.log("Db server manageged to reconnect successfully!"))


    //connect to db
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log("Initial connection successful.");
        return dbConnection; //Return the mongoose connection object

    } catch (err) {
        console.error(`Error during initial connection attempt to db: ${err.stack}`)
        throw err; //Rethrow the error for handling in the caller
    }
}

module.exports = connectToDb;
