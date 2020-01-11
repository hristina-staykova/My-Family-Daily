var orm = require("../config/orm.js");

var user = {
  selectAllUsers: function (cb) {
    orm.selectAll("users", function (res) {
      cb(res);
    });
  },
<<<<<<< HEAD
  selectUser: function (user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.select("users", condition, function (res) {
=======
  selectUser: function(user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.select("users", condition, function(res) {
>>>>>>> a01c139e67ef811be0659a363235fd72abaf46a6
      cb(res[0]);
    });
  },
  insertUser: function (cols, vals, cb) {
    orm.insert("users", cols, vals, function (res) {
      cb(res);
    });
  },
  updateUser: function (objColVals, user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.update("users", objColVals, condition, function (res) {
      cb(res);
    });
  },
  deleteUser: function (user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.delete("users", condition, function (res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;
