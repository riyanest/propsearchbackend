const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const { json } = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
const result = env.config();
env.config();

mongoose
  .connect(
    "mongodb+srv://lappy:7MZlsX2l8DylW2GL@propsearchbackend.yohsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("database connected");
  });

app.use("/auth", require("./routes/auth"));
app.use("/data", require("./routes/data"));

app.get("/", (req, res, nest) => {
  res.status(200).json({
    message: "hello from server"
  });
});

app.listen(process.env.PORT, () => {
  if (result.error) {
    throw result.error;
  }
  console.log(result.parsed);
  console.log(`server is running on port ${process.env.PORT}`);
});
module.exports = app;