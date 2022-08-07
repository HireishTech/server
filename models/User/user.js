const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: false
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    }, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;