// borda algorithm
//info to feed into barda is [{full object of results info}]

let rows = [ [ {
      rank: 1,
      option_text: 'pikachu',
      option_description: 'yellow guy' },
     {
      rank: 3,
      option_text: 'pikachu',
      option_description: 'yellow guy' },
     {
      rank: 1,
      option_text: 'pikachu',
      option_description: 'yellow guy' },
     { rank: 3, option_text: 'lizardmon', option_description: null },
     { rank: 1, option_text: 'lizardmon', option_description: null },
     { rank: 3, option_text: 'lizardmon', option_description: null },
     {
      rank: 2,
      option_text: 'diglet',
      option_description: 'less yellow' },
     {
      rank: 2,
      option_text: 'diglet',
      option_description: 'less yellow' },
     {
      rank: 2,
      option_text: 'diglet',
      option_description: 'less yellow' } ] ];

let votes = rows[0];
let tally = {};
for (i = 0; i < votes.length; i++) {
  let option = `${String(votes[i].option_text)} (${String(votes[i].option_description)})`;
  if (tally.hasOwnProperty(option)) {
    tally[option] += votes[i].rank;
  }
  else {
    tally[option] = 0;
    tally[option] += votes[i].rank;
  }
}
let number_of_options = Object.keys(tally).length;
for (let vote in tally) {
  tally[vote] = number_of_options * (number_of_options + 1) - tally[vote];
}
let arr = Object.keys(tally).map(function(key) {
  return [key, tally[key]];
});
let sorted = arr.sort(function(a, b) {
  return b[1] - a[1];
});

console.log(sorted);

// //this is an array of objects that indicate the choices picked by one voter
// let db_data = [{option_id:1, rank:2}, {option_id:2, rank:4},
//                      {option_id:3, rank:1}, {option_id:4, rank:5}, {option_id:5, rank:3}];
// let number_of_options = 5;
// let final_results = [];
// for (i = 0; i < number_of_options; i++) {
//   final_results.push(0);
// }
// for (i = 0; i < number_of_options; i++) {
//   final_results[db_data[i].option_id - 1] += number_of_options + 1 - db_data[i].rank;
// }

// console.log(final_results);


