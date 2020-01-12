var orm = require("../config/orm.js");

var user = {
  selectAllUsers: function(cb) {
    orm.selectAll("users", function(res) {
      cb(res);
    });
  },
  selectUser: function(user_id, cb) {
    var condition = "user_id =" + user_id;
    orm.select("users", condition, function(res) {
      cb(res[0]);
    });
  },
  insertUser: function(email, password, cb) {
    var cols = "email, user_password";
    var vals = "'" + email + "', '" + password + "'";
    orm.insert("users", cols, vals, function(res) {
      cb(res);
    });
  },
  updateUser: function(objColVals, user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.update("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteUser: function(user_id, cb) {
    var condition = "user_id = " + user_id;
    orm.delete("users", condition, function(res) {
      cb(res);
    });
  },
  existingUser: function(email, cb) {
    var condition = "email = '" + email + "' LIMIT 1";
    orm.select("users", condition, function(result) {
      cb(result);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;
