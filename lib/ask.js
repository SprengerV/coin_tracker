const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const view = require(path.join(__dirname, 'view.js'));
const init = require(path.join(__dirname, 'init.js'));
const update = require(path.join(__dirname, 'update.js'));

const saved = path.join(__dirname, '..', 'src', 'savedCoins.json');
const list = JSON.parse(fs.readFileSync(saved, {encoding: 'utf8', flag: 'r'})); 
const choices = list.map((index) => {
  return index.coin.toUpperCase();
});
const questions = [
  {
    name: 'choice',
    type: 'list',
    message: 'Which would you like to do?',
    choices: ['Add a new coin', 'Update a saved coin', 'View my saved coins and balances', 'Exit'],
  },
  {
    when: (ans) => ans.choice === 'Add a new coin',
    name: 'add',
    type: 'input',
    message: `What is the symbol of the coin you'd like to add?`,
  },
  {
    when: (ans) => fs.existsSync(saved) && ans.choice === 'Update a saved coin',
    name: 'update',
    type: 'list',
    message: 'Which coin would you like to update?',
    choices: [...choices, 'Cancel'],
  },
  {
    when: (ans) => ans.choice === 'View my saved coins and balances',
    name: 'view',
    type: 'checkbox',
    message: 'Which coin(s) would you like to view?',
    choices: ['All saved coins', ...choices, 'Cancel'],
  },
];

const ask = () => {
  inquirer
    .prompt(questions)
    .then((ans) => {
      switch (ans.choice) {
        case 'Add a new coin':
          init(ans.add.toLowerCase());
          break;
        case 'Update a saved coin':
          if (!ans.update) {
            console.log('No saved coins file found');
            ask();
          } else {
            if (ans.update === 'Cancel') ask()
            else update(ans.update.toLowerCase());
          }
          break;
        case 'View my saved coins and balances':
          if (ans.view === 'Cancel') ask()
          else if (ans.view === 'All saved coins') view(choices);
          else view(ans.view.toLowerCase());
          break;
        default:
          process.exit();
          break;
      };
    });
} 

module.exports = ask

