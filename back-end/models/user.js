const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

//hashing passwords
userSchema.pre('save', async function(next) {
const salt = await bcrypt.genSalt(); 
this.password = await bcrypt.hash(this.password, salt);
next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;
