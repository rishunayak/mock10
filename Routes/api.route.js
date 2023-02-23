const express=require("express")
const {User, Flight, Booking} = require("../Models/api.model")


const app=express.Router()



app.post("/register",async(req,res)=>
{
    const {email,password,name}=req.body

    const exist=await User.findOne({email:email}) 

    if(exist)
    {
        res.send("User Already Exist")
    }
    else
    {
        try
        {
            await User.create({email,name,password})
            res.status(201).send({msg:"Register Successfully"})
        }
        catch(e)
        {
            res.send(e)
        }
    }
})

app.post("/login",async(req,res)=>
{
   const {email,password}=req.body

   try
   {
     const exist=await User.findOne({email:email})

     if(exist)
     {
        if(exist.password==password)
        {
           res.status(201).send("User Login Successfully")
        }
        else
        {
            res.send("Wrong Password")
        }

     }else
     { 
        res.send("Email doesn't exist")
     }
   }
   catch(e)
   {
      res.send(e).status(404)
   }
})



app.get("/flights",async(req,res)=>
{
    try
    {
        let flight=await Flight.find()
        res.send(flight).status(200)

    }
    catch(e)
    {
        res.send(e).status(404)
    }
})

app.get("/flights/:id",async(req,res)=>
{
    const id=req.params.id
    try
    {
        let flight=await Flight.findOne({_id:id})
        res.send(flight).status(200)

    }
    catch(e)
    {
        res.send(e).status(404)
    }
})


app.post("/flights",async(req,res)=>
{
    let newData=req.body
    try
    {
         await Flight.create(newData)
         res.send("Fights Details Added Successfully").status(201)
    }
    catch(e)
    {
        res.send(e).status(404)
    }
})


app.patch("/flights/:id",async(req,res)=>
{
    const id=req.params.id
    try
    {
        await Flight.findOneAndUpdate({_id:id},req.body)
        res.send("Details Updated Successfully").status(204)

    }
    catch(e)
    {
        res.send(e).status(404)
    }
})


app.delete("/flights/:id",async(req,res)=>
{
    const id=req.params.id
    try
    {
        await Flight.findOneAndDelete({_id:id})
        res.send("Flights details Deleted Successfully").status(202)

    }
    catch(e)
    {
        res.send(e).status(404)
    }
})


app.post("/booking",async(req,res)=>
{
   const {user,flight}=req.body

   try
   {
    await Booking.create({user,flight})
    res.send("Booking Successfull").status(201)
   }
   catch(e)
   {
    res.send(e).status(404)
   }
})


app.get("/dashboard",async(req,res)=>
{
   try
   {
      const data=await Booking.find({}).populate("user").populate("flight")
     
     res.send(data).status(200)
   }   
   catch(e)
   {
    res.send(e).status(404)
   }
})


















module.exports=app
