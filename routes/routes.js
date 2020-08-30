require("express");
const router = require("express-promise-router")();
const passport = require("passport");
require("../passport");
const Controller = require("../controllers/admin");
const passportJWT = passport.authenticate("jwt", { session: false });
router.route("/google").get(
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
  }),
  Controller.socialAuth
);
router.route("/signout").get(Controller.signOut);
router.route("/updatetask").post(Controller.updateTask);
router.route("/addtask").post(passportJWT, Controller.addTask);
router.route("/deletetask").post(passportJWT, Controller.deleteTask);
router.route("/getalltasks").post(passportJWT, Controller.getAllTasks);
module.exports = router;
