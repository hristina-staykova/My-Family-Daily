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

    console.log(newUser);

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors

    $.ajax("/api/signup", {
      type: "POST",
      data: newUser
    })
      .then(function() {
        window.location.replace("/index");
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
