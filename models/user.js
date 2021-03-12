const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        minlength: 10,
        maxlength: 50
    },
    lastname:{
        type: String,
        minlength:10,
        maxlength: 50
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    created:{
        type: Date, 
        default: Date.now
    },
  
    activities:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Activity'
    }]
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, config.get('jKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      firstname: Joi.string().min(5).max(50),
      lastname: Joi.string().min(5).max(50),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;