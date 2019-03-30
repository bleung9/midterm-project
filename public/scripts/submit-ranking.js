$(document).ready( function() {

  $("#submit-button").click( function(event) {
    event.preventDefault();

    console.log("prevented default");
    $.find(".deadbolt").forEach( (x) => {
      console.log(x.children("."));
    })
  });

});
