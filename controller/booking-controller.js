import Booking from "../model/Booking.js";
import Movie from "../model/Movie.js";
import User from "../model/User.js";
import mongoose from "mongoose"
export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error)
  }
  if(!existingMovie){
    return res.status(404).json({message:"Movie Not Found"});

  }
  if(!existingUser){
    return res.status(404).json({message:"User Not Found"});
    
  }
  let booking;
  try {
    // eslint-disable-next-line no-undef
    booking = new Booking({
      movie,
      Date: new Date(`${date}`),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
  existingUser.bookings.push(booking);
    existingMovie.booking.push(booking);
    await existingUser.save({session});
    await existingMovie.save({session});
    await booking.save({session});
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable  to create booking" });
  }
  return res.status(201).json({ booking });
};

export const getBookingById = async(req,res,next)=>{
  const id = req.params.Id;
  let booking;
  try {
    // eslint-disable-next-line no-undef
    booking = await booking.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if(!booking){
    return res.status(500).json({message:"Unexpected error"})
  }
  return res.status(200).json({booking});
}

export const deleteBooking = async(req,res,next)=>{
  const id = req.params.id;
  let booking;
  try {
    // eslint-disable-next-line no-undef, no-use-before-define
    const booking = await Booking.findByIdAndDelete(id).populate("user movie")
    console.log(booking)
    const session = await mongoose.startSession();
  session.startTransaction();
  await booking.user.bookings.pull(booking);
  await booking.movie.bookings.pull(booking);
  await booking.movie.save({session});
  await booking.user.save({session});
  session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if(!booking){
return res.status(500).json({message:"Unable to Delete"})
  }
  return res.status(200).json({message:"successfully Deleted"});
}