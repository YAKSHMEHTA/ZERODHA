require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3002 
const uri= process.env.MONGO_URL || 3002 

const app = express()


app.listen(PORT,()=>{
    console.log("app started")
    mongoose.connect(uri)
    console.log("DB connected")
    
})