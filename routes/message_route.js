const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const ServiceMessage = require('../services/message')
const { allMessage, postMessage, updatedMessage, deleteMessage } = require('../services/message')
// const  { readAll } = require('../services/message')
// const { readMessage } = require('../models/message')

const router = express.Router()
router.use(bodyParser.json());


//to get all messages
router.get('/', async (req, res) => {
  try {
    const messageData = await allMessage();
    res.json(messageData)
  } catch(error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages'});
  }
})

//to post a message
router.get('/post',  async (req, res) => {
  const newPost = req.query;
  try {
    const newMessage = await postMessage(newPost);
    res.json(newMessage)
  } catch(error) {
    console.error('Error posting messages:', error);
    res.status(500).json({ error: 'Failed to post messages' });
}
}
)

//to update message
router.get('/update', async (req, res) => {
  const updatedPost = req.query
  try {
    const updatedContent = await updatedMessage(updatedPost);
    res.json(updatedContent)
  } catch(error) {
    console.error('Error updating messages:', error);
    res.status(500).json({ error: 'Failed to update messages' });
  }
}
)

//to delete message
router.get('/delete', async (req, res) => {
  const postId = Number(req.query.id);
  try {
    const deleteContent = await deleteMessage(postId);
    res.json(deleteContent)
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).json({ error: 'Failed to delete messages' });
  }
})




module.exports = router