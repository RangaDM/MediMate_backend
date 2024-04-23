const express = require("express");
const router = express.Router();
const userController = require("../controllers/userC");

router.post("/", userController.createUser);

module.exports = router;