const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const {MONGOURI} = require('./config/keys')

//connecting to database
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("conneted to MongoDB ")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})





//schemas
require('./models/user')
require('./models/post')

//routes
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


//hosting logic
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}




//declaring port number
const PORT = process.env.PORT || 5000

//listen function
app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})