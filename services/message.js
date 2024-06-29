const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const Message = require('../models/message')
// const { readAll } = require('../models/message')
const { readMessage, writeMessage, updateMsg, deleteMsg } = require('../models/message')


const router = express.Router()
router.use(bodyParser.json());

function allMessage() {
  return new Promise((resolve, reject) => {
    readMessage((err, data) => {
     if (err) {
       console.error(err);
        reject("Error reading message");
      } else {
       resolve(data);
      }
  })
})
}

function postMessage(newMessage) {
  return new Promise((resolve, reject) => {
    writeMessage(newMessage, (err, data) => {
      if (err)  {
        console.error(err);
        reject("Error posting message");
      } else {
        resolve(data)
      }
    })
  })
}

function updatedMessage(updatedMessage) {
  return new Promise((resolve, reject) => {
    updateMsg(updatedMessage, (err, data) => {
      if (err) {
        console.error(err);
        reject("Error updating message");
      } else {
        resolve(data)
      }
    })
  })
}

function deleteMessage(postId) {
  return new Promise((resolve, reject) => {
    deleteMsg(postId, (err, data) => {
      if (err) {
        console.error(err);
        reject("Error deleting message");
      } else {
        resolve(data)
      }
    })
  })

}



module.exports = {
  allMessage,
  postMessage,
  updatedMessage,
  deleteMessage
}