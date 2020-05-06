const express = require('express');
const dbHelpers = require('../db/dbHelpers.js');

// middleware
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

/*-- API REQUESTS --*/

app.get('/categories', (req, res) => {
  dbHelpers.getCategories((err, data) => {
    if (err) {
      res.status(404).send(`Err in getCategories: ${err}`);
    } else {
      res.status(200).send(data.rows);
    }
  });
});

// GET request for all challenges
app.get('/getAll', (req, res) => {
  dbHelpers.getAll((err, data) => {
    if (err) {
      res.status(404).send(`Err in getAll: ${err}`);
    } else {
      res.status(200).send(data.rows);
    }
  });
});

app.post('/challenge', ({ body }, res) => {
  let addData = {
    name: body.name,
    categories: body.categories,
    link: body.link,
  };
  dbHelpers.addChallenge(addData, (err, data) => {
    if (err) {
      res.status(404).send(`Err in addChallenge: ${err}`);
    } else {
      res.status(200).send(`Successfully added ${body.name} to db`);
    }
  });
});
