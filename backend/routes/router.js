const express = require('express')
const mySchemas = require('../models/schemas')
const router=express()
const schemas =require ('../models/schemas')
const bcrypt=require('bcrypt')
const { userAddressProperty } = require('../models/schemas')


//this code for sign up
router.post('/',async(req,res)=>{
    const{userId,userName,email,password,userType}=req.body
    try{
        const saltRounds=3;
        const user=await mySchemas.userAccountProperty.findOne({userId})
        if(user){
            res.status(201).send({message:'userid already exists'})
        }
        else{
        const hashPassword=await bcrypt.hash(password,saltRounds)
        const userAccounts={userId:userId,userName:userName,email:email,password:hashPassword,userType:userType}
        const newUser=new schemas.userAccountProperty(userAccounts)
        await newUser.save()
        res.send({message:"message sent"})
        }
        res.end()
    }
    catch(error){
        console.log("Error hashing password")
    }
})

//this code is for authenticating user upon sign in

router.post('/Signin',async(req,res)=>{
    
    try{
        const{userId,password}=req.body;
    const user= await mySchemas.userAccountProperty.findOne({userId})
    if(!user){
        return res.status(404).send({message:"User not found"})
    }
        const passwordMatch= await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(401).send({message:"Invalid password"})
    }
    return res.send({message:"user authenticated",userType:user.userType})
    }
    catch(error){
        console.log("error occured")
    }
    
})

//this code is for updating password upon forget

router.put('/ForgotPwd',async(req,res)=>{
    try{
    const userId=req.body.userId
    const password=req.body.password
    const saltRounds=3
    const user=await mySchemas.userAccountProperty.findOne({userId})
    if(!user){
        return res.status(404).send({message:"usernot found"})
    }
    const passwordMatch=await bcrypt.compare(password,user.password)
    console.log(passwordMatch)
    if(passwordMatch){
         return res.status(401).send({message:"password cannot be a previous password"})
    }
    const hashPassword=await bcrypt.hash(password,saltRounds)
   user.password=hashPassword
   user.save()
   console.log(user)
    return res.status(200).send({message:"user found"})
}
    catch(error){
        console.log("error occured")
    }
})

router.post('/Account',async(req,res)=>{
    try{
        const{userId}=req.body;
    const user= await mySchemas.userAccountProperty.findOne({userId})
    if(!user){
        return res.status(404).send({message:"User not found"})
    }
    return res.status(200).send({userName:user.userName,email:user.email})
   //return res.status(200).send({message:"sent success"})
   
    }
    catch(error){
        console.log("error occured")
    }
    return res.send({message:"user authenticated"})
})

//save userinfo upon edit

router.put('/saveUserInfo',async(req,res)=>{
    const userId=req.body.userId
    const userName=req.body.userName
    const email=req.body.email
    const currentPassword=req.body.currentPassword
    const newPassword=req.body.newPassword
    try{
    const user=await mySchemas.userAccountProperty.findOne({userId})
    if(userName){
    user.userName=userName
    console.log('user name')
    }
    if(email){
        user.email=email
        console.log('email')
    }
    if(currentPassword){
        const passwordMatch=await bcrypt.compare(currentPassword,user.password)
        if(passwordMatch){
            const saltRounds=3
            passwordHash= await bcrypt.hash(newPassword,saltRounds)
          //  const hashPassword=await bcrypt.hash(password,saltRounds)
            user.password=passwordHash
            user.save()
           return res.status(200).send({message:'password updated successfully'})
        }
        else{
          return  res.status(401).send({message:'wrong password'})
        }
    }
    user.save()
    return res.status(200).send({message:"message sent"})
    }
    catch(error)
    {
        console.error("error occured",error)
    }
})

//save new address
router.post('/saveNewAddress',async(req,res)=>{

    const{userId,aline1,aline2,city,state,zipCode}=req.body
    //console.log(aline2)
    try{
    const addrDetails={userId:userId,addLine1:aline1,addLine2:aline2,city:city,state:state,zipCode:zipCode}
    const newAddr=mySchemas.userAddressProperty(addrDetails)
    const saveNewAddr= await newAddr.save()
    res.status(200).send({message:'Address Succesfully Saved'})
    }
    catch(error){
        console.error('Failed to save new Address')
        res.status(401).send({message:'Failed to save new address'})
    }

})

//fetch adresses related to user id
router.post('/getAddresses',async(req,res)=>{
    const{userId}=req.body
    //console.log(userId)
    try{
    const user= await mySchemas.userAddressProperty.find({userId})
   // console.log(user)
    if(!user){
        res.status(404).send({message:'usernot found'})
    }
    else{
        res.status(200).send(user)
      //  console.log('user found')
    }
}
catch(error){
    console.error('issue occured',error)
}
})

//delete record using id

router.delete('/deleteAddress/:id',async(req,res)=>{
    try{
    const id=req.params.id
    const deleteRecord=await mySchemas.userAddressProperty.findByIdAndDelete(id)
    res.status(200).send({message:'record deleted successfully'})
    }
    catch(error){
        console.error("internal error")
    }
})

//fetching address of single record when users clicks on edit

router.get('/fetchAddress/:id',async(req,res)=>{
    try{
    const _id=req.params.id
    const searchRecord=await mySchemas.userAddressProperty.findOne({_id})
    //console.log(searchRecord)
    res.status(200).send(searchRecord)
    }
    catch(error){
        console.log('error occured',error)
        res.status(500).send({message:'Internal error occured'})
    }
})

//saving address on edit

router.post('/saveUserAddress/:id',async(req,res)=>{
    try{
        console.log('entered here')
        const _id=req.params.id
        const {addLine1,addLine2,city,state,zipCode}=req.body
        const editAddress=await mySchemas.userAddressProperty.findOne({_id})
        console.log(editAddress)
        if(!editAddress){
            res.status(404).send({message:'user not found'})
            console.log('user not found')
        }
        else{
            console.log("entered here")
            editAddress.addLine1=addLine1,
            editAddress.addLine2=addLine2,
            editAddress.city=city,
            editAddress.state=state,
            editAddress.zipCode=zipCode
            editAddress.save()
            res.status(200).send({message:'address updated succesfully'})
        }
    }
    catch(error){

    }
})
//code for saving card details

router.post('/saveCard',async(req,res)=>{
    try{
        const{userId,name,cardNumber,year,month,cvv}=req.body;
        const saltRounds=3;
        const hashCvv=await bcrypt.hash(cvv,saltRounds)
        const newCard={userId:userId,name:name,cardNumber:cardNumber,year:year,month:month,cvv:hashCvv}
        const saveNewCard=mySchemas.saveCardProperty(newCard)
        const saveCard=await saveNewCard.save()
        res.status(200).send({message:'card details saved successfully'})
    }
    catch(error){
        console.error('error occured:',error)
        res.status(500).send({message:'Internal error occurred'})
    }
})

//code for getting all the card details related to user

router.get('/getSavedCards/:id',async(req,res)=>{
   try{
    const userId=req.params.id
    const savedCards=await mySchemas.saveCardProperty.find({userId})
    res.status(200).send(savedCards)
   }
   catch(error){
    console.error('error occured',error)
    res.status(500).send({message:'internal error occured'})
   }
})
//code for deleting card data
router.get('/deleteCard/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const query={_id:id}
        const deleteRecord=await mySchemas.saveCardProperty.findOneAndDelete(query)
        res.status(200).send({message:'deleted successfully'})
    }
    catch(error){
        res.status(500).send({message:'Internal error occured'})
    }
})

//code for adding doctor to database

router.post('/saveDoc',async(req,res)=>{
try{
    const {docName,Specialization,isAvailable}=req.body
    //console.log(specialization)
    const docDetails={docName:docName,Specialization:Specialization,isAvailable:isAvailable}
    const newDocData=mySchemas.docDetailsProperty(docDetails)
    await newDocData.save()
}
catch(error){
    console.error(error)
}
})

//fetching doctors list

router.get('/fetchAvailableDoc',async(req,res)=>{
    try{
        const docList=await mySchemas.docDetailsProperty.find({})
       // console.log(docList)
        const filteredDocList=docList.filter((doc)=>doc.isAvailable===true)
        res.status(200).send(filteredDocList)
    }
    catch(error){
        console.error('error occurred',error)
        res.status(500).send({mesasage:'Internal error occurred'})
    }
})


//Saving appointments

router.post('/saveAppointment',async(req,res)=>{
    try{
        //console.log('save')
        const{userId,patName,patAge,specialization,docName,appDate,sTime}=req.body
        console.log(sTime)
        const appData={userId:userId,patientName:patName,patientAge:patAge,specialization:specialization,docName:docName,appDate:appDate,startTime:sTime}
        const newAppData=mySchemas.saveAppointmentDetailsProperty(appData)
        await newAppData.save()
    }
    catch(e){

    }
})


module.exports=router
