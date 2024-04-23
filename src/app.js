const { config } = require("dotenv");
const express = require("express");
const createError = require("http-errors");


config();

const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/userR'));

app.get("/", (req, res, next) => {
  try {
    // res.send("Hello Ranga!");
    // throw new Error("Something went wrong!");
    throw createError(404, "Something went wrong!");
  }
  catch (err) {
    next(err);
  }
  // res.send("Hello Ranga!");
});

app.post('/api/users', );

app.use((err, req, res, next) => {
  if (createError.isHttpError(err)) {
    res.status(err.statusCode);
    res.send(err.message);
  } else {
    res.status(500);
    res.send("Something went wrong!");
  }

  // err unknown
  res.status(500).send("Something went wrong!");
});

module.exports = app;