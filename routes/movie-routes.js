import express from "express";
import { addmovie, getAllMovies, getMovieById } from "../controller/movie-controller.js";
const movieRouter = express.Router();

movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMovieById);
movieRouter.post("/",addmovie);

export default movieRouter;
