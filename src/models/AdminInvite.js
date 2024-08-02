/////////// DEFINE AND CREATE ADMIN INVITE MODEL //////////////

/////////////////// DEPENDENCIES ///////////////

const mongoose = require('mongoose'); //import mongoose ORM tool



// Define model Schema
const adminInviteSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: '1day'}
});


// Compile the schema to the model
/**
 * Creates a collection be default if one does not exist
 * Default naming scheme is 'models' if a collection does not exist in the MongoDb cluster project
 * Additionally, the model can be explicitly mounted to a collection is specified in the options parameter
 */

const AdminInvite = mongoose.model('AdminInvite', adminInviteSchema);

module.exports = AdminInvite;
