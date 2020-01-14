var express = require("express");
var session = require("express-session");
var passport = require("./config/passport.js");
var PORT = process.env.PORT || 8080;
var app = express();
const cors = require("cors");

app.use(
  session({
    secret: "supers3cret!",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(cors());
app.options("*", cors());

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
var exphbs = require("express-handlebars");

const hbs = exphbs.create({
  defaultLayout: "main",
  //create custom helper to be used in handlebars files
  helpers: {
    //to format the datetime of createdOn
    shortDate: function(createdOn) {
      return (
        createdOn.toString().substr(4, 11) +
        " at " +
        createdOn.toString().substr(16, 5)
      );
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
