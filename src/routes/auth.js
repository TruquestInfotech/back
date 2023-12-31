const express=require('express');
const {signup,signin}=require("../controllers/auth");
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../validator/auth');
const { signout } = require('../controllers/admin/auth');

const router=express.Router();


router.post('/signup', validateSignUpRequest , isRequestValidated, signup);

router.post('/signin', validateSignInRequest, isRequestValidated ,signin);
router.post('/signout', signout );



// router.post('/profile',requireSignIn,(req,res)=>{
//     res.status(200).json({user:"Profile"})
// })




module.exports=router;
