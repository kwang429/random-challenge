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
