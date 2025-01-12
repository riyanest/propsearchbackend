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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@propsearchbackend.yohsd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majori ty`,
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