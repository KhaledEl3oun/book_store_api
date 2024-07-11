const express = require('express');
const router = express.Router();
const {Book, GetBookValidate,GetBookValidateUpdate} = require('../models/Books')
const asyncHandler = require('express-async-handler')


/**
 * @desc    Get all books
 * @route   /api/books
 * @method  Get
 * @access  public
 */
router.get("/", asyncHandler(
    async(req, res) => {
        const books = await Book.find().populate("author",["_id", "firstName","lastName"])
        res.status(200).json(books)
        }
));


/**
 * @desc    Get books by id
 * @route   /api/books
 * @method  Get
 * @access  public
 */
router.get("/:id",asyncHandler(
    async(req, res) =>{
        const book = await Book.findById(req.params.id).populate("author")
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: "not found book"});
        }
    }
));


/**
 * @desc    Create new book
 * @route   /api/books
 * @method  post
 * @access  public
 */
router.post("/", asyncHandler(
    async(req, res) => {
        console.log(req.body);
      const {error} = GetBookValidate(req.body);
      if (error) {
        return res.status(400).json({message:error.details[0].message});
    }
        const book = new Book({
            title:req.body.title,
            author:req.body.author,
            description:req.body.description,
            price:req.body.price,
            cover:req.body.cover,
        })
    const result = await book.save()
    res.status(201).json(result);
    }
));

router.put("/:id", asyncHandler(
    async(req, res) => {
        const {error} = GetBookValidateUpdate(req.body);
    
        if (error) {
            return res.status(400).json({message:error.details[0].message});
        }
        const book = await Book.findByIdAndUpdate(req.params.id,{
            $set: {
                title:req.body.title,
                author:req.body.author,
                description:req.body.description,
                price:req.body.price,
                cover:req.body.cover,
            }
        },{new: true})
        res.status(200).json(book)
    }
))

router.delete("/:id",asyncHandler(
    async(req,res) => {
        const book = await Book.findById(req.params.id);
        if (book) {
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"book has been delete"})
        } else {
            res.status(404).json({message:"not found book delete"})
        }
    }
))

module.exports = router;