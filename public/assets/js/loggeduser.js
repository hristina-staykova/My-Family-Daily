$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/user_data").then(function(data) {
    $(".userBtn").text(data.email);
  });

  //change password
  $("#changePasswordForm").on("submit", function(event) {
    event.preventDefault();
    var newPassword = $("#userPassword");
    console.log(newPassword);
  });
});
