const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serverless = require("serverless-http");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://BryanYap:97991712Ff@cluster0.s0cjc.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);
app.use("/.netlify/functions/server", usersRouter);

app.listen(port, () => {
  console.log("listening");
});

module.exports.handler = serverless(app);
