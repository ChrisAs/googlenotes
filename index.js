require("express-async-errors");
const express = require("express");
const path = require("path");
const winston = require("winston");
const app = express();
require("./Startup/db")();
require("./Startup/errorhandler")(app);
app.use(express.json());
app.use("/api", require("./routes/routes"));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
