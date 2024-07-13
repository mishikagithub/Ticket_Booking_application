/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  bookings:[{type: mongoose.Types.ObjectId,ref: "booking"}]
});

export default mongoose.model("User", userSchema);
