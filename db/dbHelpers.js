const db = require('./index.js').db;

const dbHelpers = {
  getCatTypes: function (challengeArr) {
    return new Promise((resolve, reject) => {
      let allPromises = [];
      let fetchTypes = function (catID) {
        return new Promise((resolve, reject) => {
          let queryString = `SELECT type FROM categories WHERE id = ${catID};`;
          db.query(queryString, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.rows);
            }
          });
        });
      };
      for (var challenge of challengeArr) {
        let challengePromises = [];
        for (var catID of challenge.cat_id) {
          challengePromises.push(fetchTypes(catID));
        }
        allPromises.push(challengePromises);
      }
      Promise.all(allPromises.map(Promise.all.bind(Promise)))
        .then((result) => {
          for (var i = 0; i < result.length; i++) {
            delete challengeArr[i].cat_id;
            challengeArr[i].cat_types = [];
            for (var j = 0; j < result[i].length; j++) {
              challengeArr[i].cat_types.push(result[i][j][0].type);
            }
          }

          return challengeArr;
        })
        .then((finalResult) => resolve(finalResult))
        .catch((err) => reject(err));
    });
  },
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
  updateCompleteStatus: function (id) {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE challenges SET complete = NOT complete WHERE id = ${id}`;
      db.query(queryString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getCategories: function () {
    let queryString = 'SELECT * FROM categories;';
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
    return new Promise((resolve, reject) => {
      let queryString = 'SELECT * FROM challenges ORDER BY id;';
      let getChallenges = function () {
        return new Promise((resolve, reject) => {
          db.query(queryString, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      };
      getChallenges()
        .then(({ rows }) => this.getCatTypes(rows))
        .then((result) => resolve(result))
        .catch((err) => reject(`Err in getAll ${err}`));
    });
  },
};

module.exports = dbHelpers;
