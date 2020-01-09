// all routes to be put here
var express = require("express");
var router = express.Router();
var orm = require("../config/orm.js");

// Create all our routes and set up logic within those routes where required.
//on "/" we see the login page
router.get("/", function(req, res) {
  res.render("login");
});

//"index" is the main page after login/sign up
router.get("/index", function(req, res) {
  orm.selectRecentNews(parameter);
  res.render("index");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/api/login", function(req, res) {
  //- if user exists
  //- if password is correct
  //- if user is admin
  res.render("login");
});

//create new user and enter the page
router.post("/api/signup", function(req, res) {
  //check the request - how do we pass the email & password in insertUser()
  orm.insertUser(req.body.user, cb);
  //what do we render on signup - main page?
  res.render("index");
});

//adding new news
router.post("/api/news", function(req, res) {
  //check the request - how do we pass the data (req.body?)
  orm.insertNews(news, user_id, cb);
  //we display the new news entry as a first entry?
  res.render("index");
});

//adding a comment to news
router.post("/api/comments", function(req, res) {
  //check the request - how do we pass the data (req.body?)
  orm.insertComment(comment, user_id, news_id, cb);
  res.render("index");
});

//ADMIN pages
router.get("/admin", function(req, res) {
  res.render("admin");
});

//admin page - get and display users from the db
router.get("/admin/users", function(req, res) {
  orm.selectUser(parameter1, parameter2);
  res.render("admin");
});

//admin page - get and display news from the db
router.get("/admin/news", function(req, res) {
  orm.selectNews(parameter);
  res.render("admin");
});

//admin page - get and display comments from the db
router.get("/admin/comments", function(req, res) {
  orm.selectComments(parameter);
  res.render("admin");
});

//admin page - delete user from the db
router.delete("/admin/users/:id", function(req, res) {
  var user_id = req.params.id;
  orm.deleteUser(user_id, cb);
  res.render("admin");
});

//admin page - update/edit user by id from the db
router.put("/admin/users/:id", function(req, res) {
  var user_id = req.params.id;
  orm.updateUser(objColVals, user_id, cb);
  res.render("admin");
});

//admin page - delete comment by id from the db
router.delete("/admin/comments/:id", function(req, res) {
  var comment_id = req.params.id;
  orm.deleteComment(comment_id, cb);
  res.render("admin");
});

//admin page - delete news by id from the db + its comments
router.delete("/admin/news/:id", function(req, res) {
  var news_id = req.params.id;
  orm.deleteNews(news_id, cb);
  res.render("admin");
});

// Export routes for server.js to use.
module.exports = router;
