const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User=mongoose.model("users",userSchema) 




const flightSchema=mongoose.Schema({
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: Date,
    arrivalTime: Date,
    seats: Number,
    price: Number
  })
  
  const Flight=mongoose.model("flights",flightSchema)


  const bookingSchema=mongoose.Schema(
    {
        user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        flight : {type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }
    }
   
  )
  const Booking=mongoose.model("bookings",bookingSchema)

  
  module.exports={Flight,User,Booking}