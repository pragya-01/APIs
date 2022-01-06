const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // resetLink: {
    //     data: String,
    //     default: ''
    // }
   
}, { timestamps: true}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
