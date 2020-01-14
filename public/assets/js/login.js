$(function() {
  $(".login").on("submit", function(event) {
    event.preventDefault();

    var user = {
      email: $("#userEmail")
        .val()
        .trim(),
      password: $("#userPassword")
        .val()
        .trim()
    };

    $.ajax("/api/login", {
      type: "POST",
      data: user
    })
      .then(function() {
        window.location.replace("/index");
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
