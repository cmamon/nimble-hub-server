const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    }
});

mongoose.model('User', UserSchema);
