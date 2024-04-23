require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3005;
const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://rangamaithreepala:7CPBVIDR3TGBvRLN@cluster0.qj5i6qj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });