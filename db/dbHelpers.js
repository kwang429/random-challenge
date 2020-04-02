const db = require('./index.js').db;

const dbHelpers = {
  getCatIds: function(arr, callback) {
    let idArr = [];
    for (var cat of arr) {
      let queryString = `SELECT id FROM categories WHERE type = "${cat}"`;
      db.query(queryString, (err, result) => {
        if (err) {
          callback(`err getting ${cat} id`, err);
        } else {
          console.log('idArr', idArr);
          idArr.push(result);
        }
      });
    }
    return idArr;
  },
  addChallenge: function(data, callback) {
    let idArr = getCatIds(data.categories);
    let queryString = `INSERT INTO challenges(name, category, link) VALUES (${data.name}, ARRAY ${idArr}, ${data.link})`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
  deleteChallenge: function(id, callback) {
    let queryString = `DELETE FROM challenges WHERE id=${id}`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
  completeChallenge: function(id, callback) {
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
            callback(null, result);
          }
        });
      }
    });
  },
  getCategories: function(callback) {
    let queryString = 'SELECT * FROM categories';
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = dbHelpers;
