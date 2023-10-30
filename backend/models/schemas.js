const mongoose = require("mongoose");
const Schema=mongoose.Schema

const userAccountSchema=new Schema({
    userId:{type:String},
    userName:{type:String},
    email:{type:String},
    password:{type:String},
    userType:{type:String},
})

const userAddressSchema=new Schema({
    userId:{type:String},
    addLine1:{type:String},
    addLine2:{type:String},
    city:{type:String},
    state:{type:String},
    zipCode:{type:String}
})

const saveCardSchema=new Schema({
    userId:{type:String},
    name:{type:String},
    cardNumber:{type:String},
    year:{type:String},
    month:{type:String},
    cvv:{type:String}
})

const docDetailsSchema=new Schema({
    docId:{type:String},
    docName:{type:String},
    Specialization:{type:String},
    isAvailable:{type:Boolean},
})

const appointmentSchema=new Schema({
    userId:{type:String},
    patientName:{type:String},
    patientAge:{type:Number},
    specialization:{type:String},
    docName:{type:String},
    appDate:{type:Date},
    startTime:{type:String}
})

const userAccountModel=mongoose.model('userAccountModel',userAccountSchema,'userAccounts')
const userAddressModel=mongoose.model('userAddressModel',userAddressSchema,'userAddresses')
const saveCardModel=mongoose.model('saveCardModel',saveCardSchema,'savedCardDetails')
const docDetailsModel=mongoose.model('docDetailsModel',docDetailsSchema,'docDetails')
const appDetailsModel=mongoose.model('appDetailsModel',appointmentSchema,'appointmentDetails')
const mySchemas={'userAccountProperty':userAccountModel,'userAddressProperty':userAddressModel,
                'saveCardProperty':saveCardModel,'docDetailsProperty':docDetailsModel,
                'saveAppointmentDetailsProperty':appDetailsModel}

module.exports=mySchemas