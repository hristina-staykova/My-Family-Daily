var orm = require("../config/orm.js");

var user = {
  selectAllUsers: function(cb) {
    orm.selectAll("users", function(res) {
      cb(res);
    });
  },
  selectUser: function(condition, cb) {
    orm.select("users", condition, function(res) {
      cb(res);
    });
  },
  insertUser: function(cols, vals, cb) {
    orm.insert("users", cols, vals, function(res) {
      cb(res);
    });
  },
  updateUser: function(objColVals, condition, cb) {
    orm.update("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteUser: function(user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.delete("users", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;
