require('dotenv').config()
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect(process.env.MONGO_URI);

const userSchema = new Schema({

    // User info
    regNo: {type: String, index:{unique:true}},
    yearOfStudy: {type: Number, default: 2},
    password: {type: String},

    // Technical domains
    attemptedIOS: {type: Boolean, default: false},
    attemptedWeb: {type: Boolean, default: false},
    attemptedAndroid: {type: Boolean, default: false},
    attemptedML: {type: Boolean, default: false},
    attemptedML: {type: Boolean, default: false},

    // Management domains
    attemptedMarketing: {type: Boolean, default: false},
    attemptedEditorial: {type: Boolean, default: false},
    attemptedSponsorship: {type: Boolean, default: false},
    attemptedOperations: {type: Boolean, default: false},
    attemptedLogistics: {type: Boolean, default: false},

    // Project domains
    attemptedRnD: {type: Boolean, default: false},
    attemptedProjectMgmt: {type: Boolean, default: false},

    // Design domains
    attemptedPoster: {type: Boolean, default: false},
    attemptedUIUX: {type: Boolean, default: false},
    attemptedVideoEditing: {type: Boolean, default: false},
    attempted3D: {type: Boolean, default: false},

});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;