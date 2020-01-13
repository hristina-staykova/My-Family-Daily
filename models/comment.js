var orm = require("../config/orm.js");

var comment = {
  selectAllComments: function(cb) {
    orm.selectAll("comments", function(res) {
      cb(res);
    });
  },
  selectNewsComments: function(news_id, cb) {
    var condition = "news_id = " + news_id[0];
    for (let index = 1; index < news_id.length; index++) {
      condition += " OR news_id = ";
      condition += news_id[index];
    }
    orm.select("comments", condition, function(res) {
      cb(res);
    });
  },
  insertComment: function(cols, vals, cb) {
    vals[0] = "'" + vals[0] + "'";
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
