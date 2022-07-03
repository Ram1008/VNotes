const express  = require ('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_secret = 'i$m$ram$cool';


//Route 2 : Creat a user using: POST "/api/auth/createUser". Doesnt require Auth
router.post('/createUser',
body('email').isEmail(),
body('name').isString(),
body('name').isLength({ min: 3 }),
body('password').isLength({ min: 8, max: 250 }),
async (req, res)=>{
  let success = false;
  // Checking for errors using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      // Checking for if email already exists
    let user = await User.findOne({email: req.body.email});
    if(user != null) {
      return res.json({error:"Duplicate email found"});
    }
    // Creating salt
    const salt = await bcrypt.genSalt(10);
    // Hashing Password using bcrypt.hash
    const secPass = await bcrypt.hash(req.body.password,salt);

    //Creating a user in db , fetching credentials from body
    user = await User.create({
      name:req.body.name, 
      password: secPass,
      email: req.body.email,

    });
    const data = {
      id:user.id
    }

    // Generating auth token , named as jwtData
    const jwtData = jwt.sign(data, JWT_secret);
    // console.log(jwtData);
    success = true;
    res.json({success,authtoken:jwtData})


  }catch(err) {
    console.log(err.message);
  }
})
//Route 1 : Authenticate a User using: POST "/api/auth/login". Doesnt require login
router.post('/login',[
body('email','Enter a valid Email').isEmail(),
body('password').isLength({ min: 8, max: 250 }).exists()]
,async (req, res)=>{
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.json({errors:errors.array()});
  }
  const {email, password}  =req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Enter valid Credentials"})
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error:"Enter valid Credentials"})
    }
    const data ={
      user :{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_secret);
    success = true;
    res.json({success,authtoken})
  }catch(error){
    console.log(error.message)
    res.status(500).json({error:"Internal server Error"});
  }
});

//Route 3 : Get loggedin User details using: POST "/api/auth/createUser". Loggedin Required
router.post('/getUser', fetchUser
  ,async (req, res)=>{
try{
  const userId  = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
}catch(error){
  console.log(error.message)
    res.status(500).json({error:"Internal server Error"});
}
  });
module.exports = router;