import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean
  },
  booking: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Booking"
    }
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref:"Admin",
    required: true,
  }
});

export default mongoose.model("Movie", movieSchema);
