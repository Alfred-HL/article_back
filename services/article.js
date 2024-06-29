const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');



  router.post('/api/items', (req, res) => {
    const newItem = req.body;

    // Read existing data from JSON file
    fs.readFile('../public/data.json', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error reading file');
        return;
      }

      let items = JSON.parse(data);
      items.push(newItem);

      // Write updated data back to JSON file
      fs.writeFile('data.json', JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          res.status(500).send('Error writing file');
          return;
        }
        res.json({ message: 'Item added successfully', newItem });
      });
    });
  });



module.exports = router