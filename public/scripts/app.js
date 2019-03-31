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
    $("#two-buttons").prev().append(`
      <div class="form-group">
        <label for="email">Title:</label>
        <input type="text" class="mandatory" class="form-control" style="border:1px solid black;" placeholder="Enter Title Here" name="title"/>
      </div>
      <div class="form-group">
        <label for="password">Description (Optional):</label>
        <input type="text" class="form-control" style="border:1px solid black;" placeholder="Enter Optional Description Here" name="description"/>
      </div>
    </div>`);
  });

  $("#submit").click(function(event) {
    event.preventDefault();
    let arr = $(".mandatory").toArray();
    console.log(arr);
    for (i = 0; i < arr.length; i++) {
      console.log($(arr[i]).val());
      if ($(arr[i]).val() === "") {
        alert("Please ensure all mandatory fields have been filled in!");
        return;
      }
    }
    let data = $("#submit-form").serialize();
    // $.ajax('/polls_submitted', {method: "POST"}).then(function(data) {
    //   console.log(data);
    // });
    // $.post("/poll_submitted", data);

    $.ajax({
          type: 'POST',
          // url: "http://localhost:8080/poll_submitted",
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: JSON.stringify(data),
          success: function (result) {
            console.log(result);
            console.log('hi');
            window.location.replace("/poll_submitted");
          },
          error: function(err) {
            console.log(err);
          }
        });
    });
});

