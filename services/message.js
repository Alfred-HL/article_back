const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { readMessage, MessageEdit } = require('../models/message')


const router = express.Router()
router.use(bodyParser.json());

const messageFunc = new MessageEdit()

class MessageService {
  allMessage() {
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

  postMessage(newMessage) {
  return new Promise((resolve, reject) => {
    messageFunc.writeMessage(newMessage, (err, data) => {
      if (err)  {
        console.error(err);
        reject("Error posting message");
      } else {
        resolve(data)
      }
    })
  })
}

  updatedMessage(updatedMessage) {
  return new Promise((resolve, reject) => {
    messageFunc.updateMsg(updatedMessage, (err, data) => {
      if (err) {
        console.error(err);
        reject("Error updating message");
      } else {
        resolve(data)
      }
    })
  })
}

  deleteMessage(postId) {
  return new Promise((resolve, reject) => {
    messageFunc.deleteMsg(postId, (err, data) => {
      if (err) {
        console.error(err);
        reject("Error deleting message");
      } else {
        resolve(data)
      }
    })
  })

}

}

module.exports = {
  MessageService
}