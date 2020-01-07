// all routes to be put here
var express = require("express");

var router = express.Router();

// Import the model (model.js) to use its database functions.
var nameComesHere = require("../models/model.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {});

router.post("route/comes/here", function(req, res) {});

router.put("route/comes/here", function(req, res) {});

router.delete("route/comes/here", function(req, res) {});

// Export routes for server.js to use.
module.exports = router;
