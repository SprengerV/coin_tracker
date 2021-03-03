const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const saved = path.join(__dirname, '..', 'src', 'savedCoins.json');
const list = JSON.parse(fs.readFileSync(saved, {encoding: 'utf8', flag: 'r'})); 
const choices = list.map((index) => {return index.coin});
const questions = [
  {
    name: 'choice',
    type: 'checkbox',
    message: 'Which would you like to do?',
    choices: ['Add a new coin', 'Update a saved coin', 'View my saved coins and balances'],
  },
  {
    when: (ans) => ans.choice === 'Add a new coin',
    name: 'add',
    type: 'input',
    message: `What is the symbol of the coin you'd like to add?`,
  },
  {
    when: (ans) => ans.choice === 'Update a saved coin',
    type: 'list',
    message: 'Which coin would you like to update?',
    choices: choices,
  },
];

const ask = () => {
  fs.readFile(saved, (err, data) => {
    if (err) throw err;
    inquirer
      .prompt(questions)
      .then((ans) => {

      });
  });
} 

module.exports = ask

