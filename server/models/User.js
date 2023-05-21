require('dotenv').config()
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect(process.env.MONGO_URI);

const userSchema = new Schema({

    // User info
    regNo: {type: String, index:{unique:true}},
    yearOfStudy: {type: Number, default: 2},
    password: {type: String},

    // Attemped subdomains
    attempted: {type: String, default: "{}"},

    // Responses
    responses: {type: Array, default: []}

});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;