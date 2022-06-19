const express = require("express");
const app= express();

const mongoose =  require("mongoose");
const dotenv =  require("dotenv");
const helmet =  require("helmet");
const morgan =  require("morgan");
const userRoute =require("./routes/users");
const authRoute =require("./routes/auth");
const postRoute =require("./routes/posts");

const res = require("express/lib/response");
require('dotenv').config();
dotenv.config();

//Connecting to Database Using .env file
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });



// Writing The MiddleWares Here
app.use(express.json());  
app.use(helmet());
app.use(morgan("common"));

// Api Calls Using users and auth files 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);




app.listen(8800,()=>{
    console.log("backend server is runnning ");
});

