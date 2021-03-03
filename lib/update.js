const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const Coin = require(path.join(__dirname, 'Coin.js'));

const saved = path.join(__dirname, '..', 'src', 'savedCoins.json');
const questions = [
  {
    name: 'what',
    type: 'checkbox',
    message: 'Which would you like to update?',
    choices: ['Amount invested', 'Mining rewards', 'Staking rewards'],
  },
  {
    when: (ans) => ans.what.includes('Amount invested'),
    name: 'investCash',
    type: 'number',
    message: 'How much fiat currency did you invest?',
  },
  {
    when: (ans) => ans.what.includes('Amount invested'),
    name: 'investCoins',
    type: 'number',
    message: 'How many coins did that get you?',
  },
  {
    when: (ans) => ans.what.includes('Mining rewards'),
    name: 'mined',
    type: 'number',
    message: 'How many coins did you mine?',
  },
  {
    when: (ans) => ans.what.includes('Staking rewards'),
    name: 'stakes',
    type: 'number',
    message: 'How many coins did you earn as staking rewards?',
  },  
];

const update = (coin) => {
  if (fs.existsSync(saved)) {
    inquirer
      .prompt(questions)
      .then((ans) => {
      fs.readFile(saved, (err, data) => {
        const list = JSON.parse(data);
        const matches = list.filter((index) => index.coin === coin);
        const filtered = list.filter((index) => !index.coin === coin);
        if (matches.length > 0) {
          const old = matches[0];
          const prev = new Coin(old.coin, old.invested.cashSpent,
            old.invested.coinsPurchased, old.rewards.mining, old.rewards.staking);
          if (ans.what.includes('Amount invested')) prev.invest(ans.investCash, ans.investCoins);
          if (ans.what.includes('Mining rewards')) prev.mine(ans.mined);
          if (ans.what.includes('Staking rewards')) prev.reward(ans.stakes); 
          filtered.push(prev);
          fs.writeFile(saved, JSON.stringify(filtered), (err) => {
            if (err) throw err;
            console.log(`Record for ${coin} updated.`);
            process.exit();
          });
        } else {
          console.log(`You don't have any record saved for ${coin}. "cointrack init ${coin}" to begin tracking it.`);
          process.exit();
        };
      });
    });
  } else {
    console.log(`You don't have any saved coins. "cointrack init %COIN%" to begin tracking a coin.`);
    process.exit();
  };
};  
module.exports = update;
