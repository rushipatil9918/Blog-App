const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Optional: Ensure unique emails
    },
    password: {
      type: String,
      required: true,
    },
    userBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId, // Correct capitalization
        ref: 'blog', 
      },
    ],
  },
  { timestamps: true } 
);

module.exports = mongoose.model('user', userSchema);
