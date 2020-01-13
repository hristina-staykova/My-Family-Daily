// Make sure we wait to attach our handlers until the DOM is fully loaded.
// here come all the functionalities on the page - listeners, ajax calls, etc.

$(function() {
  $(".deleteBtn").on("click", function() {
    var id = $(this).data("id");
    var table = $(this).data("table");

    // Send the DELETE request.
    $.ajax(`/admin/${table}/` + id, {
      type: "DELETE",
      data: id
    }).then(function() {
      console.log(`Record with id: ${id} deleted from ${table}`);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
