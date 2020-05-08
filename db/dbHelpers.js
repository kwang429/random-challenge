const db = require('./index.js').db;

const dbHelpers = {
  getCatIds: function (arr, callback) {
    let promises = [];
    function fetchId(category) {
      return new Promise((resolve, reject) => {
        let queryString = `SELECT id FROM categories WHERE type = '${category}';`;
        db.query(queryString, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows[0].id);
          }
        });
      });
    }

    for (var category of arr) {
      promises.push(fetchId(category));
    }

    Promise.all(promises)
      .then((results) => {
        callback(null, results);
      })
      .catch((err) => callback(err));
  },
  addChallenge: function (data, callback) {
    let idArr = new Promise((resolve, reject) => {
      dbHelpers.getCatIds(data.categories, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    idArr.then((arr) => {
      let queryString = `INSERT INTO challenges(name, cat_id, link) VALUES ('${data.name}', ARRAY [${arr}], '${data.link}')`;
      db.query(queryString, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    });
  },
  deleteChallenge: function (id, callback) {
    let queryString = `DELETE FROM challenges WHERE id=${id}`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
  completeChallenge: function (id, callback) {
    let updateStr = `UPDATE challenges SET completed = true WHERE id = ${id}`;
    let addStr = `INSERT INTO completed (ref_id) VALUES (${id})`;

    const updateReq = new Promise((resolve, reject) => {
      db.query(updateStr, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const addReq = new Promise((resolve, reject) => {
      db.query(addStr, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    updateReq.then(() => addReq);
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
  getCategories: function () {
    let queryString = 'SELECT * FROM categories';
    return new Promise((resolve, reject) => {
      db.query(queryString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getAll: function () {
    let queryString = 'SELECT * FROM challenges';
    return new Promise((resolve, reject) => {
      db.query(queryString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = dbHelpers;
