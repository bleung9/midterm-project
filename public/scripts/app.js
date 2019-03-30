$(document).ready(function() {

/*  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });
  });*/


  $("#add").click(function(event) {
    event.preventDefault();
    $("#two-buttons").prev().append( `
      <div class="form-group">
        <label for="email">Title:</label>
        <input type="text" class="form-control" style="border:1px solid black;" placeholder="Enter Title Here" name="title"/>
      </div>
      <div class="form-group">
        <label for="password">Description (Optional):</label>
        <input type="text" class="form-control" style="border:1px solid black;" placeholder="Enter Optional Description Here" name="description"/>
      </div>
    </div>`);
  });

  $("#submit").click(function(event) {
    console.log("Asdf");
    $.post("/poll_submitted");
  });

});

