const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model('task', taskSchema);

module.exports = Task;
