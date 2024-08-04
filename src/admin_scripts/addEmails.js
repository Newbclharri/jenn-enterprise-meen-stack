const { connection } = require('mongoose');
const path = require('path');
const connectToDb = require(path.join(__dirname, '..', 'connection.js'));
const AdminEmailModel = require(path.join(__dirname, '..', 'models', 'ApprovedAdminEmail.js'));
const AdminModel = require(path.join(__dirname, '..', 'models', 'Admin.js'));


/**
 * Adds multiple email addresses to the ApprovedAdminEmails collection.
 * 
 * @param {...string} emails - The email addresses to add.
 * @returns {Promise<void>} - A promise that resolves when the operation completes.
 * @throws {Error} - If there is an error inserting the email addresses into the database.
 */
const addEmails = async function (...emails) {
    // Create an array of email documents to be inserted
    const emailDocs = emails.map(email => ({ email }));
    console.log(emailDocs);
    try {
        // ConnectToDb
        const connection = await connectToDb();

        // Add emails after connection to db
        await AdminEmailModel.insertMany(emailDocs);
        console.log('Emails successfully added to the collection.');


    } catch (err) {
        // Log an error message if the insertion fails
        console.error(`Error writing emails to the approvedAdminEmails collection: ${err.stack}`);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
            console.log(`Connection closed succesfully after adding ${emails.length} email(s) to the ApprovedAdminEmails collection.`)
        }
    }
};

// If the script is run directly from the command line
if (require.main === module) {
    const emails = process.argv.slice(2); // Get command-line arguments
    if (emails.length === 0) {
        console.error('Please provide at least one email address to add.');
        process.exit(1); // Exit with a failure code
    }

    addEmails(...emails).catch(err => {
        console.error(`Error adding emails to the collection: ${err.stack}`);
        process.exit(1); // Exit with a failure code on error
    })

}

module.exports = addEmails;