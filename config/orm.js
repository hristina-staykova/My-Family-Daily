// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectRecentNews: function(cb) {
    var queryString = `
    SELECT * FROM
    (SELECT * FROM news
    ORDER BY news.createdOn DESC
    LIMIT 10) AS recent_news
    LEFT OUTER JOIN comments ON recent_news.news_id = comments.news_id
    ORDER BY recent_news.createdOn DESC`;
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectUsers: function(cb) {
    var queryString = "SELECT * FROM users";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectComments: function(cb) {
    var queryString = "SELECT * FROM comments";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectNews: function(cb) {
    var queryString = "SELECT * FROM news";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectUser: function(user, cb) {
    var queryString = "SELECT * FROM users WHERE email = ?";
    connection.query(queryString, [user.email], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertUser: function(user, cb) {
    var queryString = "INSERT INTO users (email, user_password) VALUES (?,?)";
    connection.query(queryString, [user.email, user.password], function(
      err,
      result
    ) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertNews: function(news, user_id, cb) {
    var queryString = "INSERT INTO news (content, user_id) VALUES (?,?)";
    connection.query(queryString, [news.content, user_id], function(
      err,
      result
    ) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertComment: function(comment, user_id, news_id, cb) {
    var queryString =
      "INSERT INTO comments (content, user_id, news_id) VALUES (?,?,?)";
    connection.query(queryString, [comment.content, user_id, news_id], function(
      err,
      result
    ) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteUser: function(user_id, cb) {
    var queryString = "DELETE FROM users WHERE user_id =?";
    connection.query(queryString, [user_id], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteComment: function(comment_id, cb) {
    var queryString = "DELETE FROM comments WHERE comment_id =?";
    connection.query(queryString, [comment_id], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteNews: function(news_id, cb) {
    var queryString = `
    DELETE news, comments
    FROM news
    INNER JOIN comments ON news.news_id = comments.news_id
    WHERE news.news_id = ?`;
    connection.query(queryString, [news_id], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateUser: function(objColVals, user_id, cb) {
    var queryString = "UPDATE users SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE user_id = ";
    queryString += user_id;
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// Export the orm object for the controller (controller.js).
module.exports = orm;
