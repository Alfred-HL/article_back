const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


// const messagePath = '../public/messages.json'

//read messages.json file
function readMessage(callback) {
  fs.readFile('./public/messages.json', (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null); // Pass error to callback
      return;
    }

    try {
      const content = JSON.parse(data).posts;
      callback(null, content); // Pass content to callback
    } catch (error) {
      console.error('Error parsing JSON:', error);
      callback(error, null); // Pass parsing error to callback
    }
  });
}

function writeMessage(newMessage, callback) {
  readMessage((err, messages) => {
    if (err) {
      callback(err);
      return;
    }

    const lastId = messages.length > 0 ? messages[messages.length - 1].messageId : 0;
    newMessage.messageId = lastId + 1;

    messages.push(newMessage);

    fs.writeFile('./public/messages.json', JSON.stringify({ posts: messages }, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        callback(err);
      } else {
        callback(null, newMessage);
      }
    });
  })
}

function updateMsg(updatedMessage, callback) {
  const postId = Number(updatedMessage.messageId);
  const updatedContent = updatedMessage.content;

  readMessage((err, messages) => {
    if (err) {
      callback(err);
      return;
    }

    const index = messages.findIndex(p => p.messageId === postId);

    if (index === -1) {
          res.status(404).send('Post not found');
          return;
        }

    messages[index].content = updatedContent

    fs.writeFile('./public/messages.json', JSON.stringify({ posts: messages }, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        callback(err);
      } else {
        callback(null, updatedMessage);
      }
    });
  }
  )
}

function deleteMsg(postId, callback) {
  readMessage((err, messages) => {
    if (err) {
      callback(err);
      return;
    }
    const index = messages.findIndex(p => p.messageId === postId);

    // if (index === -1) {
    //   // res.status(404).send('Post not found');
    //   // return;
    //   console.error('Error searching file:', err);
    //   callback(err);
    // }
    const deletedPost = messages.splice(index, 1)[0];

    fs.writeFile('./public/messages.json', JSON.stringify({ posts: messages }, null, 2), (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        callback(err);
      } else {
        callback(null, deletedPost);
      }
    });

  })
}







module.exports = { 
  // readAll
  readMessage,
  writeMessage,
  updateMsg,
  deleteMsg
}