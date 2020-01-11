var orm = require("../config/orm.js");

var comment = {
  selectAllComments: function(cb) {
    orm.selectAll("comments", function(res) {
      cb(res);
    });
  },
  insertComment: function(cols, vals, cb) {
    orm.insert("comments", cols, vals, function(res) {
      cb(res);
    });
  },
  deleteComment: function(comment_id, cb) {
    var condition = "comment_id = " + comment_id;
    orm.delete("comments", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = comment;
