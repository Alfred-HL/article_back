const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


// read messages.json file
// function readMessage(callback) {
//   fs.readFile('./public/messages.json', (err, data) => {
//     if (err) {
//       console.error(err);
//       callback(err, null); // Pass error to callback
//       return;
//     }
//     try {
//       const content = JSON.parse(data).posts;
//       callback(null, content); // Pass content to callback
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//       callback(error, null); // Pass parsing error to callback
//     }
//   });
// }

// read messages.json file
const messageData = readMessages().posts
function readMessages() {
  try {
    const data = fs.readFileSync('./public/messages.json', 'utf8');
    const messages = JSON.parse(data);
    return messages;
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
    throw err;
  }
}


//fs用promise包，避免callback
//write to message.json file
function editMessage(messages, callback) {
  fs.writeFile('./public/messages.json', JSON.stringify({ posts: messages }, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      callback(err);
    } else {
      callback(null);
    }
  });
}

// function editMessage(messages){
//   return new Promise((resolve, reject) => {
//     fs.writeFile('./public/messages.json', JSON.stringify({ posts: messages }, null, 2), (err) => {
//       if (err) {
//         reject('Error writing file')
//       } else {
//         resolve(null)
//       }
//     })
//   })
// }

// read messages.json file

//class with add/update/delete message function
class MessageEdit {
  // writeMessage(newMessage, callback) {
    // readMessage((err, messages) => {
    //   if (err) {
    //     callback(err);
    //     return;
    //  }

    //  const lastId = messages.length > 0 ? messages[messages.length - 1].messageId : 0;
    //  newMessage.messageId = lastId + 1;

    //  messages.push(newMessage);

    //  editMessage(messages, (err) => {
    //     if (err) {
    //       callback(err);
    //    } else {
    //       callback(null, newMessage);
    //     }
    //  });
  //  })
// }

  writeMessage(newMessage, callback){
    const lastId = messageData.length > 0 ? messageData[messageData.length - 1].messageId : 0;
    newMessage.messageId = lastId + 1;

    messageData.push(newMessage);
    
    editMessage(messageData, (err) => {
        if (err) {
          callback(err);
       } else {
          callback(null, newMessage);
        }
     });

  }

  // searchMsg(index, callback) {
  //   // const postId = Number(searchId.messageId)

  //   readMessage((err, messages) => {
  //     if (err) {
  //       callback(err);
  //       return;
  //     }
  //     const searchMsg = messages[index]
  //     callback(null, searchMsg)
  
  //   })
  // }


  searchMsg(index, callback) {
    const searchMsg = messageData[index]
    callback(null, searchMsg)
  }

//modify message
//   updateMsg(updatedMessage, callback) {
//     const postId = Number(updatedMessage.messageId);
//     const updatedContent = updatedMessage.content;

//     readMessage((err, messages) => {
//       if (err) {
//         callback(err);
//         return;
//       }

//       const index = messages.findIndex(p => p.messageId === postId);

//       messages[index].content = updatedContent

//     editMessage(messages, (err) => {
//       if (err) {
//         callback(err);
//       } else {
//         callback(null, updatedMessage);
//       }
//     });
//   }
//   )
// }

  updateMsg(updatedMessage, callback) {
    const postId = Number(updatedMessage.messageId);
    const updatedContent = updatedMessage.content;

    const index = messageData.findIndex(p => p.messageId === postId);

    messageData[index].content = updatedContent

    editMessage(messageData, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, updatedMessage);
      }
    });
  }
      
//delete message
//   deleteMsg(index, callback) {
//     readMessage((err, messages) => {
//       if (err) {
//         callback(err);
//         return;
//       }

//     const deletedPost = messages.splice(index, 1)[0];

//     editMessage(messages, (err) => {
//       if (err) {
//         callback(err);
//       } else {
//         callback(null, deletedPost);
//       }
//     });

//   })
// }
  deleteMsg(index, callback) {
    const deletedPost = messageData.splice(index, 1)[0];

    editMessage(messageData, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, deletedPost);
      }
    });
  }

}

module.exports = { 
readMessages,
  MessageEdit
}