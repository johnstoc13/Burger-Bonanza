// Wait to attach handlers until DOM is fully loaded
$(function() {

    $(".change-state").on("click", function(event) {
      var id = $(this).data("id");
      var newSleep = $(this).data("newsleep");
      var devouredState = {
        devoured: newSleep
      };
      // Send PUT request
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devouredState
      }).then(
        function() {
          console.log("changed state to", newSleep);
          // Reload page to get updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
      var newBurger = {
        name: $("#ca").val().trim(),
      };
      // Send POST request
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
      // Send DELETE request
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload page to get updated list
          location.reload();
        }
      );
    });
  });
  