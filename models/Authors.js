const mongoose = require('mongoose');
const joi = require('joi');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength:200
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength:200
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength:200
    },
    image: {
        type: String,
       default: "defult-avatar.png"
    },
  
}, {timestamps: true});

   function GetAuthorValidate(obj){
    const schema = joi.object({
        firstName: joi.string().trim().min(3).max(200).required(),
        lastName: joi.string().trim().min(3).max(200).required(),
        nationality: joi.string().trim().min(3).max(200).required(),
        image: joi.string().trim().min(4).max(100),
    })
    return schema.validate(obj);
    };
    function GetValidateUpdate(obj){
    const schema = joi.object({
        firstName: joi.string().trim().min(2).max(100).required(),
        lastName: joi.string().trim().min(2).max(100).required(),
        nationality: joi.string().trim().min(2).max(100).required(),
        image: joi.string().trim().min(4).max(100),
    })
    return schema.validate(obj);
    };

   const Author = mongoose.model("Author", AuthorSchema);

   module.exports ={ Author, GetAuthorValidate, GetValidateUpdate }
