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
  dbHelpers
    .getCategories()
    .then((data) => res.status(200).send(data.rows))
    .catch((err) => res.status(404).send(`Err in getCategories: ${err}`));
});

// GET request for all challenges
/* Refactor: Promises Vers.
app.get('/getAll')
  .then((data) => {
  res.status(200).send(data.rows)
})
  .catch((err) => {
  res.status(404).send(err in getAll)
  })
*/
app.get('/getAll', (req, res) => {
  dbHelpers
    .getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).send(`Err in getAll: ${err}`));
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

app.put('/delete', ({ body }, res) => {
  dbHelpers
    .deleteChallenge(body.id)
    .then(() => res.status(200).send(`Successfully deleted ${body.id}`))
    .catch((err) => res.status(404).send(`Err in deleting ${body.id}`));
});
