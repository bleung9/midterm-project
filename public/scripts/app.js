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
        <input type="text" class="mandatory" class="form-control"  placeholder="Enter Title Here" name="title"/>
      </div>
      <div class="form-group">
        <label for="password">Description (Optional):</label>
        <input type="text" class="form-control" placeholder="Enter Optional Description Here" name="description"/>
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
    $.post("/poll_submitted", data).then(function(result) {
      console.log(result);
      $('#two-buttons').append('</br><a href="http://localhost:8080/a/' + result.admin_link + '">Your admin link</a></br><a href="http://localhost:8080/u/' + result.participant_link + '">Your participant link</a>');
    });
  });
});