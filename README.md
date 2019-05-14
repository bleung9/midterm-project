# Pikachoose

Pikachoose is a Pikachu themed decision making app.  Whoever wants to administer a poll can make a poll with a question and multiple possible answers.  Participants of the poll can rank their choices by dragging and dropping their ranked selection list at a link for voting.  The administrator can view the results of the poll at a separate administrator link.  The final winner is chosen using the Borda algorithm (<https://en.wikipedia.org/wiki/Borda_count#Borda's_system_(starting_at_1)>).  In addition, the administrator is also emailed a link to both the voting and results pages via Mailgun.

My teammates on this project are Tess Thornley (<https://github.com/tessthornley/>) and Aleksey van Leeuwarden Khabra (<https://github.com/VanLeeuwarden/>).  

This project uses port 8080 (<http://localhost:8080/> in your browser.).

## Dependencies

- agent-base version ^4.2.1 or above
- body-parser version ^1.15.2 or above
- bootstrap version ^4.3.1 or above
- dotenv version ^2.0.0 or above
- ejs version ^2.4.1 or above
- esprima version ^4.0.1 or above
- express version ^4.13.4 or above
- knex version ^0.11.7 or above
- knex-logger version ^0.1.0 or above
- mailgun-js version ^0.22.0 or above
- mongodb version ^2.2.36 or above
- morgan version ^1.7.0 or above
- node-sass version ^4.11.0 or above
- node-sass-middleware version ^0.9.8 or above
- pg version ^6.0.2 or above
- sass version ^1.17.3 or above
- tsscmp version ^1.0.6 or above

## Final Product

!["Creating a poll"](https://i.imgur.com/CCrgwel.png)
!["Voting page"](https://i.imgur.com/eSTZcUb.png)
!["Results page"](https://i.imgur.com/oAiMtdq.png)

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run local` (or `npm run local-w` if you use vagrant on Windows) command.
- Run the app at <http://localhost:8080/> in your browser.



