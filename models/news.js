// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var news = {
  selectRecentNews: function(howMany, cb) {
    orm.selectAndLimit("news", howMany, function(res) {
      cb(res);
    });
  },
  selectAllNews: function(cb) {
    orm.selectAll("news", function(res) {
      cb(res);
    });
  },
  insertNews: function(cols, vals, cb) {
    orm.insert("news", cols, vals, function(res) {
      cb(res);
    });
  },
  deleteNews: function(news_id, cb) {
    var queryString =
      `
        DELETE news, comments
        FROM news
        INNER JOIN comments ON news.news_id = comments.news_id
        WHERE news.news_id =` + news_id;
    orm.execute(queryString, cb);
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = news;
