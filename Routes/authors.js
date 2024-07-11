const express = require('express');
const router = express.Router();
const { Author, GetAuthorValidate, GetValidateUpdate } = require('../models/Authors');
const asyncHandler = require('express-async-handler');





/**
 * @desc    Get all authors
 * @route   /api/authors
 * @method  Get
 * @access  public
 */
router.get("/", asyncHandler(
    async(req, res) => {
        const AuthorsList = await Author.find();
        res.status(200).json(AuthorsList);
    }
));

/**
 * @desc    Get authors by id
 * @route   /api/authors
 * @method  Get
 * @access  public
 */
router.get("/:id", asyncHandler(
    async(req, res) =>{
         const author = await Author.findById(req.params.id)
         if (author) {
             res.status(200).json(author);
         } else {
             res.status(404).json({message: "not found author"});
         }
     }
));


/**
 * @desc    Create new author
 * @route   /api/authors
 * @method  post
 * @access  public
 */
router.post("/", asyncHandler(
    async(req, res) => {
        console.log(req.body);
    const {error} = GetAuthorValidate(req.body);
    if (error) {
       return res.status(400).json({message: error.details[0].message})
    }
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });
       const result = await author.save();
        res.status(201).json(result);
    }
))

/**
 * @desc    update authors
 * @route   /api/authors
 * @method  put
 * @access  public
 */
router.put("/:id", asyncHandler(
    async(req, res) => {
        const {error} = GetValidateUpdate(req.body);
        if (error) {
            return res.status(400).json({message:error.details[0].message});
        }
        const author = await Author.findByIdAndUpdate(req.params.id,
            {
            $set: {
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image
            },  
        }, 
        {new: true}
    );
        res.status(200).json(author);
       
    }
))

/**
 * @desc    Delete author
 * @route   /api/authors
 * @method  Delete
 * @access  public
 */
router.delete('/:id', asyncHandler(
    async(req, res) => {
         const author = await Author.findById(req.params.id);
         if (author) {
             await Author.findByIdAndDelete(req.params.id)
             console.log("delete");
             res.status(200).json({message: "author has been delete"})
         } else {
             console.log(" not delete");
             res.status(404).json({message: "author not found"})
         }
     }
))

module.exports = router;