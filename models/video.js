import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  // You can add more fields as needed
});

const videoModel= mongoose.model('Video', videoSchema);
export default videoModel
