const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const ticketSchema=new mongoose.Schema({
    category:{type:String,required:true},
    title:{type:String,required:true},
    message:{type:String,require:true},
    time:{type:Number}
})

const bookmarkSchema=new mongoose.Schema({
    category:{type:String,required:true},
    title:{type:String,required:true},
    message:{type:String,require:true},
    time:{type:Number}
})


const tickeModal=mongoose.model("ticket",ticketSchema)
const bookmarkModal=mongoose.model("bookmark",bookmarkSchema)
const UserModal= mongoose.model("User",UserSchema)
module.exports = {UserModal,tickeModal,bookmarkModal}