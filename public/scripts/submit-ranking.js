$(document).ready( function() {

  function getRankPairs() {
    var rankPairs = [];
    $( ".ranked-list-element").each(function(idx) {
      rankPairs.push([parseInt($(this).attr('option_id')), idx+1]);
    })
    return rankPairs;
  }

  $("#submit-button").click( function(event) {
    event.preventDefault();
    var participant_name = $("input").val();
    var rankPairs = getRankPairs();
    var dataFields = rankPairs.map(function(pair) {
      return pair.push(participant_name);
    });

    $.ajax({
      type: 'POST',
/*      url: '/',*/
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: rankPairs,
      success: function (result) {
        console.log(result);
        console.log('hi');
        window.location.href = response.redirect;
      }
      error: function(err) {
        console.log(err);
      }
    });

  });
});
