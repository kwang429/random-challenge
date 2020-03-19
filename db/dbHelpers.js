const db = require('./index.js');

const dbHelpers = {
  add: function(data, callback) {
    let queryString = `INSERT INTO challenges(name, category, link) VALUES (${data.name}, ${data.category}, ${data.link})`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
  delete: function(id, callback) {
    let queryString = `DELETE FROM challenges WHERE id=${id}`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
  done: function(id, callback) {
    let updateStr = `UPDATE challenges SET completed = true WHERE id = ${id}`;
    let addStr = `INSERT INTO completed (ref_id) VALUES (${id})`;
    db.query(updateStr, (err, result) => {
      if (err) {
        callback(err);
      } else {
        db.query(addStr, (err, result) => {
          if (err) {
            console.log("Couldn't add to completed table");
            callback(err);
          } else {
            callback(result);
          }
        });
      }
    });
  }
};

module.exports = dbHelpers;
