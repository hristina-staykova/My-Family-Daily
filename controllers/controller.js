// all routes to be put here
var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var model = require("../models/model.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) { res.render("index") });

router.get("/signup", function (req, res) {
    res.render('signup');
});
router.get("/login", function (req, res) {
    res.render('login');
});


router.post("route/comes/here", function (req, res) { });

router.put("route/comes/here", function (req, res) { });

router.delete("route/comes/here", function (req, res) { });

// Export routes for server.js to use.
module.exports = router;
