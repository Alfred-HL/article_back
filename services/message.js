const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { readMessages, MessageEdit } = require('../models/message')

const router = express.Router()
router.use(bodyParser.json());

const messageFunc = new MessageEdit()

const messageData = readMessages().posts

class MessageService {
  allMessage() {
    return messageData
//   return new Promise((resolve, reject) => {
//     readMessage((err, data) => {
//      if (err) {
//        console.error(err);
//         reject("Error reading message");
//       } else {
//        resolve(data);
//       }
//   })
// })
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

  searchMessage(searchId) {
    const postId = Number(searchId.messageId)
    const index = messageData.findIndex(p => p.messageId === postId);

    if (index === -1) {
      return 'Message not found';
    } else {
      return new Promise((resolve, reject) => {
        messageFunc.searchMsg(index, (err, data) => {
          if (err) {
            console.error(err);
            reject("Error searching for message");
          } else {
            resolve(data)
          }
        })
      })
    }
  }

  updatedMessage(updatedMessage) {
    const postId = Number(updatedMessage.messageId)
    const index = messageData.findIndex(p => p.messageId === postId);

    if (index === -1) {
      return 'Message not found';
    } else {
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
  }

  deleteMessage(postId) {
    const index = messageData.findIndex(p => p.messageId === postId);

    if (index === -1) {
      return 'Message not found';
    } else {
      return new Promise((resolve, reject) => {
        messageFunc.deleteMsg(index, (err, data) => {
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

}

module.exports = {
  MessageService
}