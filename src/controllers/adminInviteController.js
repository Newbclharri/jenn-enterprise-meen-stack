/////////// ADMIN INVTTE CONTROLLER ///////////
const path = require('path');
const approvedAdminEmailModel = require(path.join(__dirname, '..', 'models', 'ApprovedAdminEmail'));
exports.getInviteForm = function (req, res) {
    res.render('adminInvite', {
        title: 'Admin Invitation',
        message: "You've been invited to be a Jenn Enterprise Admin!",
        stylesheet: 'assets/styles/adminInvite.css'
    })
}



///////// MIDDLEWARE CALLBACK FUNCTIONS//////////
exports.isApprovedEmail = async function isApprovedAdminEmail(req, res, next) {
    const {email} = req.body
    const result = await approvedAdminEmailModel.findOne({ email });
    if(!result){
        return res.render('adminInvite',{
            error: `${email} is not on the list of approved Admins.`,
            stylesheet: 'assets/styles/adminInvite.css'
        })
    }

    next();
}

