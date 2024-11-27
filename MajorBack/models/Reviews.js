const mongoose=require('mongoose')
const reviewsSchema=mongoose.Schema({
    ownerName:{
        required:true,
        type:String,
    },
    driverName:{
        required:true,
        type:String,
    },
    rating:{
        required:true,
        type:Number
    },
    reviewMessage:{
        required:true,
        type:String
    },
    requestId:{
        required:true,
        type:String
    }
},{timestamps:true})
const OwnerReviews=mongoose.model("OwnerReviews",reviewsSchema)
module.exports=OwnerReviews;