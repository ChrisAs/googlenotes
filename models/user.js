const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    username: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
