require("dotenv").config()

const express=require("express")
const cors=require("cors")
const connect=require("./config/config")
const api=require("./Routes/api.route")
const app=express()

app.use(express.json())
app.use(cors())

app.use("/api",api)





app.get("/",(req,res)=>
{
    res.send("Welecome to server")
})


app.listen(process.env.PORT,async()=>
{
    await connect
    console.log("Server started")
})