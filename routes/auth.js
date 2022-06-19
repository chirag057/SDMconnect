const router = require("express").Router();
const { rawListeners } = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt")
//Register

router.post("/register", async(req,res)=>{
  try{
    // Generate new Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt) // Encryption in the Database

    // Create new User
    const newUser=new User({
      username:req.body.username,
      email:req.body.email,
      password:hashedPassword,
     });
     // Save User and respond
   const user = await newUser.save();
   res.status(200).json(user);
  }

  catch(err){
   console.log(err)
   res.status(500).json(err)
  }

});

// Login 

router.post("/login",async(req,res)=>{
  try{
    const user=await User.findOne({email:req.body.email});   //Used to find wether there is a existing user
    !user && res.status(404).send("User not found");

    const validPassword= await bcrypt.compare(req.body.password,user.password)
    !validPassword && res.status(400).send("Wrong Password");

    res.status(200).json(user)
  }
   catch(err){
    console.log(err); 
    res.status(500).json(err)
   }
});


module.exports = router;

 

