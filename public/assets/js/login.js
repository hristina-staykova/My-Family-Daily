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

    console.log(user);

    // // eslint-disable-next-line no-undef
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
