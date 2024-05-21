const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true,
        minlength: 7
    },
    username: {
        type: String,
        unique: true
    },
    mobileNo: {
        type: Number,
        require: false,
        length: 10
    },
    age: {
        type: Number,
        require: false,
        maxlength: 3
    },
    
    bloodGroup: {
        type: String,
        require: false
    },
    isDoc: {
        type: Boolean,
        require: true,
    }
});

module.exports = User = mongoose.model('user',userDataSchema);
