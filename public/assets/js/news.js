// Make sure we wait to attach our handlers until the DOM is fully loaded.
// here come all the functionalities on the page - listeners, ajax calls, etc.

$(function() {
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#burger")
        .val()
        .trim()
    };

    if (newBurger.name.length > 0) {
      // Send the POST request.
      $.ajax("/api/comments", {
        type: "POST",
        data: newBurger
      }).then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });
});
