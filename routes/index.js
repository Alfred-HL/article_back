const express = require('express');


const router = express.Router()

// const article = require('./article_route')

const message = require('./message_route')

// router.use('/article', article)
router.use('/message', message)


module.exports = router
