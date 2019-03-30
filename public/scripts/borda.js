// borda algorithm
//info to feed into barda is [{full object of results info}]



function getRank(admin_link) {
  knex('polls').insert({ admin_link: submitForm.admin_link, participant_link: submitForm.participant_link, poll_question: submitForm.poll_question, creator_email: submitForm.creator_email})
  .then(function () {
    let optionsToInsert = submitForm.title.map((x, index) => ({admin_link: submitForm.admin_link, option_text: x, option_description: submitForm.description[index]}));
    console.log("Options to insert", optionsToInsert);
      for (let i = 0; i < optionsToInsert.length; i++) {
        knex('options').insert(optionsToInsert[i]).then();
      }
  }).then(function () {
    console.log('Success')
    knex.destroy();
  }).catch(function(err) {
    console.log(err);
  });
}



//this is an array of objects that indicate the choices picked by one voter
let db_data = [{option_id:1, rank:2}, {option_id:2, rank:4},
                     {option_id:3, rank:1}, {option_id:4, rank:5}, {option_id:5, rank:3}];
let number_of_options = 5;
let final_results = [];
for (i = 0; i < number_of_options; i++) {
  final_results.push(0);
}
for (i = 0; i < number_of_options; i++) {
  final_results[db_data[i].option_id - 1] += number_of_options + 1 - db_data[i].rank;
}

console.log(final_results);
