var express = require("express");
var router = express.Router();
var comment = require("../models/comment.js");
var user = require("../models/user.js");
var news = require("../models/news.js");
var passport = require("../config/passport.js");
var bcrypt = require("bcryptjs");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Create all our routes and set up logic within those routes where required.

//ADMIN pages
router.get("/admin", isAuthenticated, function(req, res) {
  user.selectUserByEmail(req.user, function(user) {
    if (user.is_admin === 1) {
      res.render("admin");
    } else {
      res.send("Access Denied. Only Admin can access this Page!");
    }
  });
});

//admin page - get and display users from the db - OK
router.get("/admin/users", function(req, res) {
  console.log("admin users page");
  user.selectAllUsers(function(allUsers) {
    console.log(allUsers);
    res.render("admin", { allUsers });
  });
});

//admin page - get and display news from the db - OK
router.get("/admin/news", function(req, res) {
  news.selectAllNews(function(allNews) {
    console.log(allNews);
    res.render("admin", { allNews });
  });
});

//admin page - get and display comments from the db - OK
router.get("/admin/comments", function(req, res) {
  comment.selectAllComments(function(allComments) {
    console.log(allComments);
    res.render("admin", { allComments });
  });
});

//admin page - delete user from the db - OK
router.delete("/admin/users/:id", function(req, res) {
  var user_id = req.params.id;
  user.deleteUser(user_id, function(result) {
    console.log(result);
    res.end();
  });
});

//admin page - delete comment by id from the db - OK
router.delete("/admin/comments/:id", function(req, res) {
  var comment_id = req.params.id;
  comment.deleteComment(comment_id, function(comments) {
    console.log(comments);
    res.end();
  });
});

//admin page - update/edit user by id from the db - OK
router.put("/admin/users/:id", function(req, res) {
  var user_id = req.params.id;
  var objColVals = {};
  if (req.body.user_password != null) {
    objColVals["user_password"] = req.body.user_password;
  }
  if (req.body.is_admin != null) {
    objColVals["is_admin"] = req.body.is_admin;
  }
  user.updateUser(objColVals, user_id, function(comments) {
    console.log(comments);
    res.end();
  });
});

//admin page - delete news by id from the db + its comments - OK
router.delete("/admin/news/:id", function(req, res) {
  var news_id = req.params.id;
  news.deleteNews(news_id, function(news) {
    console.log(news);
    res.end();
  });
});

//adding new news - OK
router.post("/api/news", function(req, res) {
  //check the request - the news content and the logged user id
  news.insertNews(
    ["content", "user_id"],
    [req.body.content, req.body.user_id],
    function(result) {
      res.json({ id: result.insertId });
    }
  );
});

//adding a comment to news - OK
router.post("/api/comments", function(req, res) {
  //check the request - the content and the logged user_id and the news_id
  comment.insertComment(
    ["content", "user_id", "news_id"],
    [req.body.content, req.body.user_id, req.body.news_id],
    function(result) {
      res.json({ id: result.insertId });
    }
  );
});

//on "/" we see the login page - OK
router.get("/", function(req, res) {
  res.render("login");
});

//OK
router.get("/signup", function(req, res) {
  res.render("signup");
});

//OK
router.get("/login", function(req, res) {
  res.render("login");
});

//"index" is the main page after login/sign up -
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/index", isAuthenticated, function(req, res) {
  news.selectRecentNews(10, function(recentNews) {
    var news = recentNews;
    var news_ids = [];
    news.forEach(element => {
      news_ids.push(element.news_id);
    });
    comment.selectNewsComments(news_ids, function(comments) {
      news.forEach(newsEl => {
        newsEl.comments = [];
        comments.forEach(commentEl => {
          if (commentEl.news_id === newsEl.news_id) {
            newsEl.comments.push(commentEl);
          }
        });
      });
      user.selectUserByEmail(req.user, function(user) {
        console.log(user);
        res.render("index", { news, user });
      });
    });
  });
});

router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

//create new user - OK
// and enter the page
router.post("/api/signup", function(req, res) {
  user.existingUser(req.body.email, function(result) {
    if (result[0] != undefined) {
      return res.status(400).json({
        error: "Email already taken!"
      });
    } else {
      var password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10),
        null
      );
      user.insertUser(req.body.email, password, function(result) {
        res.status(200).json(result);
      });
    }
  });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function(req, res) {
  if (!req.user) {
    console.log(req.user);
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.user_id
    });
  }
});

//changing the password from the user
router.post("/new-password", function(req, res) {
  console.log(req.body);
  console.log("getting password");
});

// Export routes for server.js to use.
module.exports = router;
