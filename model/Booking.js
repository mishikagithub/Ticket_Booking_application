import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    Date:{
       type:Date,
       required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
});

export default mongoose.model("Booking", bookingSchema)