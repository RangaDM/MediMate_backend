const express = require('express');

const router = express.Router();
const historyC = require('../controllers/historyC');

router.post('/add', historyC.addHistory);
