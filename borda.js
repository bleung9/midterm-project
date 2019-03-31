// borda algorithm
//info to feed into barda is [{full object of results info}]

// let rows = [ [ {
//       rank: 1,
//       option_text: 'pikachu',
//       option_description: 'yellow guy' },
//      {
//       rank: 3,
//       option_text: 'pikachu',
//       option_description: 'yellow guy' },
//      {
//       rank: 1,
//       option_text: 'pikachu',
//       option_description: 'yellow guy' },
//      { rank: 3, option_text: 'lizardmon', option_description: null },
//      { rank: 1, option_text: 'lizardmon', option_description: null },
//      { rank: 3, option_text: 'lizardmon', option_description: null },
//      {
//       rank: 2,
//       option_text: 'diglet',
//       option_description: 'less yellow' },
//      {
//       rank: 2,
//       option_text: 'diglet',
//       option_description: 'less yellow' },
//      {
//       rank: 2,
//       option_text: 'diglet',
//       option_description: 'less yellow' } ] ];


function borda(rows) {
  let votes = rows[0];
  console.log("rows", rows);
  console.log("votes", votes);
  console.log("votes.length", votes.length);
  let tally = {};
  let text_to_des = {};
  for (i = 0; i < votes.length; i++) {
    let option = `${String(votes[i].option_text)} (${String(votes[i].option_description)})`;
    text_to_des[String(votes[i].option_text)] = votes[i].option_description;
    if (tally.hasOwnProperty(option)) {
      tally[option] += votes[i].rank;
    }
    else {
      tally[option] = 0;
      tally[option] += votes[i].rank;
    }
  }
  console.log("tally", tally);
  let number_of_options = Object.keys(tally).length;
  console.log("number_of_options", number_of_options);
  for (let vote in tally) {
    tally[vote] = (number_of_options + 1) * (votes.length / number_of_options)  - tally[vote];
  }
  console.log("tally", tally);
  let arr = Object.keys(tally).map(function(key) {
    return [key, tally[key]];
  });
  console.log(arr);
  let sorted = arr.sort(function(a, b) {
    return b[1] - a[1];
  });
  console.log(sorted);

  for (i = 0; i < sorted.length; i++) {
    for (let element in text_to_des) {
      if (`${String(element)} (${String(text_to_des[element])})` === sorted[i][0]) {
        sorted[i].push(String(element));
        sorted[i].push(text_to_des[element]);
      }
    }
  }
  console.log("sorted:", sorted);

  //push a value of true into the arrays denoting the top ranked choice(s)
  if (sorted.length !== 0) {
    let max = sorted[0][1];
    sorted[0].push(true);
    for (i = 1; i < sorted.length; i++) {
      if (max > sorted[i][1]) {
        break;
      }
      else {
        sorted[i].push(true);
      }
    }
  }
  console.log(sorted);
  return sorted;
}

module.exports = {
  borda: borda
};
