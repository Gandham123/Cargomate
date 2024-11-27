const mongoose=require('mongoose')
const loadsDetailsSchema=new mongoose.Schema({
       name:{
        type:String,
        required:true
       },
       loadDate:{
        type:String,
        required:true
       },
       unloadDate:{
        type:String,
        required:true
       },
       weight:{
        type:String,
        required:true
       },
       from:{
        type:String,
        required:true
       },
       to:{
        type:String,
        required:true
       },
       price:{
        type:String,
        required:true,
       },
       mobileNumber:{
        type:String,
        required:true
       },
       typeofLoad:{
        type:String,
        required:true
       },
       ownerImage:{
        type:String,
        required:true
       }
},{timestamps:true})
const loadDetails=mongoose.model("loadDetails",loadsDetailsSchema)
module.exports=loadDetails;