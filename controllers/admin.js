const tryCatch = require('../middleware/trycatch');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');
const config = require('../configuration/index');

signToken = (user) => {
  return JWT.sign(
    {
      iss: config.jwtSecret,
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    config.jwtSecret
  );
};

module.exports = {
  socialAuth: tryCatch(async (req, res, next) => {
    const { authInfo, user } = req;
    const token = signToken(user);
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    res.redirect(
      `/tasks?_id=${user._id}&email=${user.email}&googleId=${user.googleId}`
    );
  }),
  addTask: tryCatch(async (req, res, next) => {
    let { userId, task } = req.body;
    console.log(userId, task);
    const newTask = new Task({
      task,
      userId,
    });
    task = await newTask.save();
    return res.status(200).json({ success: true, task });
  }),
  deleteTask: tryCatch(async (req, res, next) => {
    const { taskId } = req.body;
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({ success: true });
  }),
  getAllTasks: tryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const data = await Task.find().where({ userId });
    return res.status(200).json({ success: true, data });
  }),
  updateTask: tryCatch(async (req, res, next) => {
    const { taskId, task } = req.body;
    const data = await Task.findByIdAndUpdate(taskId, {
      task,
    });
    return res.status(200).json({ success: true, data });
  }),
  signOut: tryCatch(async (req, res, next) => {
    res.clearCookie('access_token');
    return res.json({ success: true });
  }),
};
