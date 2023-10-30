const express=require('express')
const cors = require('cors')
const bodyParser=require('body-parser')
const router =require('./routes/router')
const mongoose =require('mongoose')
require('dotenv/config')

const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions={
    origin: '*',
    Credentials: true,
    optionSucessStatus:200
} 

app.use(cors(corsOptions))
app.use('/',router)
const dbOptions={useNewUrlParser:true,useUnifiedTopology:true}

mongoose.connect(process.env.DB_URI,dbOptions)
.then(()=>console.log('dbConnected'))
.catch(error=>console.log(error))

const port=4000
const server=app.listen(port,()=>{
    console.log('server is up & running')
})