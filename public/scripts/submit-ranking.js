$(document).ready( function() {

  function getRankPairs() {
    var optionIDs = [];
    var ranks = [];
    $( ".ranked-list-element").each(function(idx) {
      optionIDs.push( parseInt($(this).attr('option_id')) );
      ranks.push(idx+1);
    })
    return {optionIDs: optionIDs, ranks: ranks}
  }

  $("#submit-button").click( function(event) {
    event.preventDefault();
    var participant_name = $("input").val();
    var rankPairs = getRankPairs();
/*    var dataFields = rankPairs.map(function(pair) {
      return pair.push(participant_name);
    });*/

    rankPairs.participant_name = participant_name;

    $('#options').append('<h6>You have voted successfully!  Look at all these happy Pikachus!</h6><img src="https://media1.tenor.com/images/da5e861c72c6ebd3a8e0979d2b79a6e0/tenor.gif">');

    $.ajax({
      type: 'POST',
      // url: "http://localhost:8080/votes_submitted",
      dataType: 'json',
      data: rankPairs // {key: "BIG STUPID STRING HERE IT IS LOOOK AT HOW STUPID IT IS THIS DUMB STUPID STRING"}
    })
    .done(function() {
      window.location.replace("../thanks");
    })
    .fail( function() {
      console.log('neppers');
    });
  });
});
