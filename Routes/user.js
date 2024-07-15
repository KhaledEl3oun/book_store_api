const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User,validateUpdateUser } = require('../models/User');
const {verifyIsAdmin , verifyTokenAndAuthorization} = require('../middlewares/verifyToken');
const bcrypt = require('bcryptjs');


/**
 * @desc    get all user
 * @route   /api/user
 * @method  GET
 * @access  privet
 */
router.get("/",verifyIsAdmin,asyncHandler(async (req,res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users)
}))
/**
 * @desc    get user by id
 * @route   /api/auth/:id
 * @method  GET
 * @access  privet
 */
router.get("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select("-password");
   if (user) {
    res.status(200).json(user)
   } else {
    res.status(404).json({message: "user not found"})
   }
}))
/**
 * @desc    update new user
 * @route   /api/auth/:id
 * @method  PUT
 * @access  public
 */
router.put("/:id",verifyTokenAndAuthorization, asyncHandler(async(req,res) => {
const {error} = validateUpdateUser(req.body);
if (error) {
    return res.status(400).json({message: error.details[0].message})
}

console.log(req.headers);
if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
req.body.password = await bcrypt.hash(req.body.password, salt);
}
const userUpdate = await User.findByIdAndUpdate(req.params.id,{
    $set: {
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
    }
},{new: true}).select("-password")
res.status(200).json(userUpdate)
}))

module.exports = router;