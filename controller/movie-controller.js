import jwt from "jsonwebtoken";
import Movie from "../model/Movie.js";
import mongoose from "mongoose";
import Admin from "../model/Admin.js";
export const addmovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1]; //bearer token

  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not found" });
  }
  let adminId;

  //verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //crete new movie
  const { title, description, releasedate, posterUrl, featured, actors }=req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !releasedate &&
    releasedate.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === "" &&
    !featured &&
    featured.trim() === "" &&
    !actors &&
    actors.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid input" });
  }

  let movie;
  try {

    // eslint-disable-next-line no-undef
    movie = new Movie({
      description,
      releaseDate: new Date(`${releasedate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });

    // eslint-disable-next-line no-undef
    const session = await mongoose.startSession();
    // eslint-disable-next-line no-undef
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(500).json({ message: "requested Failed" });
  }
  return res.status(201).json({ movie });
};

export const getAllMovies = async (req,res,next)=>{
  let movies;
  try {
    movies = await Movie.find();
  } catch (error) {
    return console.log(error);
  }

  if(!movies){
    return res.status(500).json({message:"Request Failed"});

  }
  return res.status(200).json({movies});
}

export const getMovieById = async(req,res,next)=>{
  const id = req.params.id;

  let movie;
  try{
    movie= await Movie.findById(id)
  }catch(err){
    return console.log(err)
  }
  if(!movie){
    return res.status(404).json({message:" invalid Movie ID"})
  }
  return res.status(200).json({movie})
}

