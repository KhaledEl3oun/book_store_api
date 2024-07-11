const mongoose = require('mongoose');
const joi = require('joi');

const UserSchema = new mongoose.Schema({
    email :{
        type: String,
        required:true,
        trim:true,
        minLength:5,
        maxlength:100
    },
    userName :{
        type: String,
        required:true,
        trim:true,
        minLength:3,
        maxlength:100
    },
    password :{
        type: String,
        required:true,
        trim:true,
        minLength:6,
        
    },
    isAdmin :{
        type: Boolean,
        default:false,
    },
},{timestamps:true}
);

const User = mongoose.model('User',UserSchema);

function validateRegisterUser(obj){
const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    userName: joi.string().trim().min(3).max(100).required(),
    password: joi.string().trim().min(6).required(),
    isAdmin: joi.boolean()
});
return schema.validate(obj);
}
function validateLoginUser(obj){
const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(6).required(),
   
});
return schema.validate(obj);
};
function validateUpdateUser(obj){
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        userName: joi.string().trim().min(3).max(100).required(),
        password: joi.string().trim().min(6).required(),
        isAdmin: joi.boolean()
    });
    return schema.validate(obj);
    }

module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser,
}

