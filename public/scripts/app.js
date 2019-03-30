$(document).ready(function() {

  function checkMultipleQuestionsSubmit() {

  }


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


  $("#submit-button").click(function(event) {
    event.preventDefault();
    for (x of $("#poll").children() ) {
      console.log(x);
    }
    // console.log($("#poll").children());

    // check more than 1 question submitted
/*    console.log($("#two-buttons"));
    $.post("/poll_submitted");*/
  });

});

