$(function() {
  $(".signUp").on("submit", function(event) {
    event.preventDefault();

    var newUser = {
      email: $("#userEmail")
        .val()
        .trim(),
      password: $("#userPassword")
        .val()
        .trim()
    };

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors

    $.ajax("/api/signup", {
      type: "POST",
      data: newUser
    })
      .done(function(res) {
        console.log(res);
        window.location.replace("/index");
      })
      .fail(function(err) {
        console.log(err.responseJSON.error);
      });
  });
});
