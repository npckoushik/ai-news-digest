import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  interests: [String]
});

export default mongoose.model("User", UserSchema);
