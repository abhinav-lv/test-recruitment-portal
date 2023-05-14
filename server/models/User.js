require('dotenv').config()
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect(process.env.MONGO_URI);

const userSchema = new Schema({
    regNo: {type: String, index:{unique:true}},
    password: {type: String},
});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;