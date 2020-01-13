// Make sure we wait to attach our handlers until the DOM is fully loaded.
// here come all the functionalities on the page - listeners, ajax calls, etc.

$(function() {
  $("#signUpButton").on("submit", function(event) {
    event.preventDefault();

    var newUser = {
      email: $("#userEmail")
        .val()
        .trim(),
      password: $("#userPassword")
        .val()
        .trim()
    };
    $.ajax(
      "/api/signup",
      { type: "POST", data: newUser }.then(function(event) {
        //to be continued
      })
    );
  });

  $(".addNews").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newNews = {
      content: $("#content")
        .val()
        .trim(),
      user_id: document.querySelector(".userBtn").getAttribute("user_id")
    };

    if (newNews.content.length > 0) {
      // Send the POST request.
      $.ajax("/api/news", {
        type: "POST",
        data: newNews
      }).then(function() {
        console.log("created new News");
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });

  $(".addComment").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newComment = {
      content: this.querySelector("textarea").value.trim(),
      user_id: document.querySelector(".userBtn").getAttribute("user_id"),
      news_id: this.getAttribute("news_id")
    };
    if (newComment.content.length > 0) {
      // Send the POST request.
      $.ajax("/api/comments", {
        type: "POST",
        data: newComment
      }).then(function() {
        console.log("created new Comment");
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });
});
