require("dotenv").config({path:"./config.env"})
const express = require("express");
const app = express();
const userRouter = require("./routes/user.js");
const certRouter = require("./routes/cert.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const cors =require("cors")
app.use(cors())
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    ()=>console.log("Mongodb is successfully connected")
).catch(
    (err)=>console.log(err)
)

//configuring body parser(accepts key value from request and parses)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//configuring morgan(logger)
app.use(morgan("dev"));

app.get("/",(req,res,next)=>{
    res.json({message:"This works, thankyou"})
    next();
});
app.use("/users",userRouter);
app.use("/certs",certRouter);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'/Frontend/dist')));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'Frontend','dist','index.html'))
    })
}
else{
    app.get("/",(req,res)=>{
        res.send("API Running")
    })
}
const PORT=4000;
const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

module.exports = app;
