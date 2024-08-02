//////// Approved Admin Emails //////////

// Import mongoose
const mongoose = require('mongoose');

// Define schema for approved admin emails
const approvedAdminEmailSchema = new mongoose.Schema({ email: { type: String, unique: true } }, { timestamps: true });

// Compile Schema to the Model
const ApprovedAdminEmail = mongoose.model("ApprovedAdminEmail", approvedAdminEmailSchema);

const addEmails = async function (...emails) {
    const emailDocs = emails.map(email => ({ email }))
    console.log(emailDocs)
    try {
        await ApprovedAdminEmail.insertMany(emailDocs)
    } catch (err) {
        console.error(`Error writing emails to the approvedAdminEmails collection: ${err.stack}`);
    }
}

//Export the model
module.exports = ApprovedAdminEmail;