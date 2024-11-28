const express=require('express');
const User=require('./models/userregister.js')
const loads=require('./models/loadDetails.js')
const driverPosts=require('./models/DriverPosts.js')
const driverRequestToOwner=require('./models/DriverRequests.js');
const OwnerReviews=require('./models/Reviews.js');
const nodemailer = require("nodemailer");
const { ObjectId } = require('mongodb')
const dotenv=require('dotenv')
const app=express();
const bcrypt=require('bcrypt');
const cors = require('cors');
app.use(cors());
const jwt=require('jsonwebtoken');
app.use(express.json());
const mongoose=require('mongoose');
dotenv.config()
function verify(request,response,next){
    let token=null
    let authHeaders=request.headers["authorization"]
    if(authHeaders===undefined){
        response.status(401).send("Jwt Token not Presented")
    }
    else{
        token=authHeaders.split(" ")[1]
        if(token===undefined){
            response.status(401).send("UnAuthorized")
        }
        else{
            jwt.verify(token,"Satya",(error,payload)=>{
                if(error){
                    response.status(401).send("Invalid Token")
                }
                else{
                    next()
                }
            })
        }
    }
}
app.post('/login',async(request,response)=>{
    try{
        let dbUser= await User.find({name:request.body.name})
        const{name,password}=request.body;
        if(dbUser.length!==0){
            const passwordCheck=await bcrypt.compare(password,dbUser[0].password);
            if(passwordCheck===true){
                const payload={name:name}
                const token=jwt.sign(payload,"Satya")
                response.status(200).send({token,userDetails:dbUser})
            }
            else{
                response.status(400).send({message:"Invalid Password"})
            }
        }
        else{
            response.status(400).json({message:"User not existed"})
        }
    }
    catch(error){
        console.log(error)
    }
})
app.post('/register',async(request,response)=>{
    try{
        const checkUserExistedOrNot=await User.find({name:request.body.name})
        if(checkUserExistedOrNot.length ===0){
            const {name,password,mail,adhar,typeofuser,typeoftruck,profilepic,mobilenum}=request.body;
            const hashhedPassword=await bcrypt.hash(password,10);
            const finalUserDetails={name,password:hashhedPassword,mail,adhar,typeofuser,typeoftruck,profilepic,mobilenum}
            await User.create(finalUserDetails) 
            response.status(200).json({message:"User Registerd Succefully"});
        }
        else{
            response.status(500).send("Already USer Existed");
        }
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
})
app.get('/userDetails/:name',verify,async(request,response)=>{
    try{
       const fetchData=await User.find({name:request.params.name})
       response.status(200).send({data:fetchData})
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
app.post('/load', verify, async (request, response) => {
    try {
        await loads.create(request.body);
        response.status(200).send({ message: "Load posted successfully" });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});
app.get('/load',verify,async(request,response)=>{
    const {fromAddress,toAddress,date}=request.query;
    const query = {};

    // Add conditions only if the parameters are provided
    if (fromAddress.length!==0) {
        query.from = fromAddress;
    }
    if (toAddress.length!==0) {
        query.to = toAddress;
    }
    if (date.length!==0) {
        query.loadDate = date;
    }
    try{
        const fetchedDetals=await loads.find(query);
        response.status(200).json({fetchedDetals})
    }
    catch (error) {
        response.status(500).send({ message: error.message });
    }
    
})
app.get('/loaddetails/:id',verify,async(request,response)=>{
    const{id}=request.params;
    try{
        const data= await loads.findById(id)
        response.status(200).send({data})
    }
    catch (error) {
        response.status(500).send({ message: error.message });
    }
})
app.post('/driverpost',verify,async(request,response)=>{
      try{
        await driverPosts.create(request.body);
        response.status(200).send({message:'Your Details Posted Successfully'})
      }
      catch (error) {
        response.status(500).send({ message: error.message });
    }
})
// this is the for owner page avvailble trucks with filtering items 
app.get('/driverpost',verify,async(request,response)=>{
    const{from_address,to_address}=request.query;
    const queryObj={};
    if(from_address.length!==0){
        queryObj.from_address=from_address
    }
    if(to_address.length!==0){
        queryObj.to_address=to_address
    }
    try{
        const AvailbleDriver=await  driverPosts.find(queryObj);
        response.status(200).send({AvailbleDriver})
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
// this is for the profile page recent posts retrving from db for particular logined user
app.get('/driverpost/:name',verify,async(request,response)=>{
    try{
        const{name}=request.params;
        const recentPosts=await driverPosts.find({driver_name:name})
        response.status(200).send({recentPosts});
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
app.get('/driversavailble',verify,async(request,response)=>{
    try{
       const availbleDrivers=await driverPosts.find();
       response.status(200).send({availbleDrivers}) 
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "example@gmail.com",
      pass: "***********",
    },
    logger: true,
    logLevel: 'info'
  });
app.post('/driverrequest',verify,async(request,response)=>{
    try{
        await driverRequestToOwner.create(request.body);
        const userDetailsFromDB=await User.find({name:request.body.postedBy})
        const tomailAddress=userDetailsFromDB[0].mail;
        console.log(tomailAddress);
        const info= await transporter.sendMail({
            from:"CARGOMATE gmail.com>",
            to:tomailAddress,
            subject:"Driver Sended Request to Your Load",
            html:`
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hello ${request.body.postedBy},</p>
            <p>We are pleased to inform you that a driver has shown interest in transporting the load you recently posted. The driver is ready to discuss the details of the transport and proceed with arrangements at your convenience.</p>
            <p>Please check your dashboard on our platform to review the request and find the driver's contact information.</p>
            <p>Thank you for using our platform to connect with reliable drivers. We look forward to supporting your transportation needs.</p>
            <p>Best regards,</p>
            <p><strong>CARGOMATE Team</strong></p>
        </div>`
        })
        //console.log("Message sent:", info.messageId);
        response.status(200).send({message:"Your details succefully sended goods owner"})
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
app.get('/driverrequests/:name',verify,async(request,response)=>{
    const{name}=request.params;

    try{
      const userRequests= await driverRequestToOwner.find({$or:[
        {driverName:name},
        {postedBy:name}
      ]})
      response.status(200).send({userRequests});
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
//this is for owner profile page we have display count of pending and completed loads count in the owner profile page
app.get('/completedloads/:name',verify,async(request,response)=>{
   try{
    const{name}=request.params;
    const pendingCount=await driverRequestToOwner.countDocuments({statusOfRequest:"Pending",postedBy:name})
    const completedCount=await driverRequestToOwner.countDocuments({statusOfRequest:"Completed",postedBy:name})
    const results=await driverRequestToOwner.find({statusOfRequest:"Completed",postedBy:name})
  
    response.status(200).send({pendingCount,completedCount,results})
      
   }catch(error){
    response.status(500).send({message:error.message})
   }
})
//for updating the driverrequests stastus
app.put('/driverrequests/:id',verify,async(request,response)=>{
    try{
    const{id}=request.params
    const{status_update}=request.query;
    const requestDetailsStoredInDb=await driverRequestToOwner.findById(id);
    const driverEmailAddress=requestDetailsStoredInDb.driverEmailId;
    await driverRequestToOwner.updateOne({_id:id},
        {$set:{statusOfRequest:status_update}})
    if(status_update==="Accepted"){
        const info= await transporter.sendMail({
            from:"CARGOMATE <maheshpro1434@gmail.com>",
            to:driverEmailAddress,
            subject:"Your Transport Request Has Been Accepted!",
            html:`
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hello ${requestDetailsStoredInDb.driverName},</p>
            <p>We are excited to inform you that the load owner has accepted your request to transport their load. You may now log in to your dashboard on our platform to view the owner's contact information and finalize the transport arrangements.</p>
            <p>Thank you for choosing our platform to connect with shippers. We look forward to helping you with smooth and successful transport.</p>
            <p>Best regards,</p>
            <p><strong>CARGOMATE Team</strong></p>
        </div>`
        })
        await loads.deleteOne({_id:requestDetailsStoredInDb.postedLoadId})
    }
    if(status_update==="Rejected"){
        const info= await transporter.sendMail({
            from:"frommil@gmail.com>",
            to:driverEmailAddress,
            subject:"Update on Your Transport Request",
            html:`
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hello ${requestDetailsStoredInDb.driverName},</p>
            <p>We wanted to inform you that the load owner has decided not to proceed with your request to transport their load at this time.</p>
            <p>Thank you for your interest and for using our platform to connect with shippers. We encourage you to explore other available loads on our platform, and we look forward to supporting you in finding the right transport opportunities.</p>
            <p>Best regards,</p>
            <p><strong>CARGOMATE Team</strong></p>
        </div>`
        })
    }
    response.status(200).send({message:"Your Request Status has been updated successfully"})
    }catch (error) {
        response.status(500).send({ message: error.message });
    }

})
//Posting the Reviewsin db
app.post('/reviews',verify,async(request,response)=>{
    try{
        const{requestId}=request.body;
        await driverRequestToOwner.updateOne({_id:requestId},{$set:{statusOfRequest:"Completed"}})
        await OwnerReviews.create(request.body)
        response.status(200).send({message:"Review Submitted Successfully"})
    }catch (error) {
        response.status(500).send({ message: error.message });
    }
})
//retriving the reviews and avg review of the particular driver
app.get('/review/:name',verify,async(request,response)=>{
    try{
        const{name}=request.params
        const reviewDetails=await OwnerReviews.find({driverName:name}) 
        const avgRating= await OwnerReviews.aggregate([
            {
              $match: {
                driverName: name
              }
            },
            {
              $group: {
                _id:"$driverName",
                avgRating: { $avg: "$rating" }
              }
            }
          ])
        response.status(200).send({avgRating,reviewDetails})
    }catch(error){
       response.status(500).send({message:error.message})
    }
})
//retrving the data to show the driver profile for owner
app.get('/trucks/:id',verify,async(request,response)=>{
    try{
    const{id}=request.params;
    const driverDetails=await driverPosts.findById(id)
    const reviewDetails=await OwnerReviews.find({driverName:driverDetails.driver_name}) 
    const avgRating= await OwnerReviews.aggregate([
            {
              $match: {
                driverName: driverDetails.driver_name  
              }
            },
            {
              $group: {
                _id:"$driverName",
                avgRating: { $avg: "$rating" }
              }
            }
    ])
    response.status(200).send({driverDetails,avgRating,reviewDetails})
    }catch(error){
        response.status(500).send({message:error.message})
    }

}) 

//mongoose.connect("mongodb+srv://satyabhaskargandham:Satya%40123@major.kd4cw.mongodb.net/User-details?retryWrites=true&w=majority&appName=major")
mongoose.connect("Mongodb server connection string")
.then(()=>{
    console.log('connected to database!..')
    app.listen(4000,()=>(console.log("Server is Running ....")))
})
.catch((error)=>{
    console.log(`connection-failed ${error}`)
})
