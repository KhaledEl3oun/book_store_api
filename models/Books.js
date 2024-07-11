const mongoose = require('mongoose');
const joi = require('joi');

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlengh:250,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    description: {
        type: String,
        required: true,
        trim: true,
       
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]
    },
},{timestamps: true}
);
const Book = mongoose.model("Book", BookSchema);

function GetBookValidate(obj){
    const schema = joi.object({
        title:joi.string().trim().min(3).max(250).required(),
        author:joi.string().required(),
        description:joi.string().trim().required(),
        price:joi.number().min(0).required(),
        cover:joi.string().valid("soft cover", "hard cover").required(),
    })

   return schema.validate(obj);
   
}
function GetBookValidateUpdate(obj){
    const schema = joi.object({
        title:joi.string().trim().min(3).max(250),
        author:joi.string(),
        description:joi.string().trim(),
        price:joi.number().min(0),
        cover:joi.string().valid("soft cover", "hard cover"),
    })

   return schema.validate(obj);
   
}

module.exports = {Book , GetBookValidate, GetBookValidateUpdate}

