////CONNECTS TO DB///////////

// Load .env variables to process.env
require('dotenv').config();

//imports mongoose package
const mongoose = require('mongoose');

// Load connection string
const MONGO_DB_URI = process.env.MONGO_DB_URI;

function connectToDb() {
    const dbConnection = mongoose.connection;

    // Setup event listeners to catch emitted connection events
    dbConnection
        .on('error', (err)=> console.log(`Error during connection: ${err.stack}`))
        .on('disconnected', () => console.log("Db server disconnected."))
        .on('reconnected', () => console.log("Db server manageged to reconnect successfully!"))


    mongoose.connect(MONGO_DB_URI)
        .then(() => console.log("Initial connection successful."))
        .catch((err) => console.error(`Error during initial connection attempt to db: ${err.stack}`));
}

module.exports = connectToDb;
