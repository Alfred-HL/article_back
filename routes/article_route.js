const express = require('express');
const router = express.Router()
const article = require('../services/article')
const message = require('../services/message')

router.get('/message', message)



module.exports = {
  article,
  message,
}