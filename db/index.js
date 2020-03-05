const Pool = require('pg').Pool;
require('dotenv').config();

const db = new Pool({
  user: `${process.env.DB_USER}`,
  host: `${process.env.DB_HOST}`,
  database: 'coding_challenges',
  password: `${process.env.DB_PASS}`,
  port: 5432
});

db.connect(err => {
  if (err) {
    console.log('Err in db connection:', err);
  } else {
    console.log('Connected to pg');
  }
});

module.exports = {
  db
};
