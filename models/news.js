// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var news = {
  selectRecentNews: function(howMany, cb) {
    orm.selectAndLimit(howMany, function(res) {
      cb(res);
    });
  },
  selectAllNews: function(cb) {
    orm.selectAll("news", function(res) {
      cb(res);
    });
  },
  insertNews: function(cols, vals, cb) {
    vals[0] = "'" + vals[0] + "'";
    console.log(vals);
    orm.insert("news", cols, vals, function(res) {
      cb(res);
    });
  },
  deleteNews: function(news_id, cb) {
    var condition = "news_id = " + news_id;
    orm.delete("news", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = news;
