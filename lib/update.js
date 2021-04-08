const fs = require('fs');
const inquirer = require('inquirer');
const dayjs = require('dayjs');
const path = require('path');
const {ENODATA} = require('constants');
const Coin = require(path.join(__dirname, 'Coin.js'));
const error = require(path.join(__dirname, 'error.js'));
const ask = require(path.join(__dirname, 'ask.js'));
const init = require(path.join(__dirname, 'init.js'));

const saved = path.join(__dirname, '..', 'src', 'savedCoins.json');
const questions = [
  {
    name: 'what',
    type: 'checkbox',
    message: 'Which would you like to update?',
    choices: ['Amount invested', 'Mining rewards', 'Staking rewards', 'Coins spent'],
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
  {
    when: (ans) => ans.what.includes('Coins spent'),
    name: 'spentCoins',
    type: 'number',
    message: 'How many of your coins did you spend?',
  },
  {
    when: (ans) => ans.what.includes('Coins spent'),
    name: 'cashBack',
    type: 'number',
    message: 'How much cash did you get for those coins?',
  },
];
const askInit = [
  {
    name: 'conf',
    type: 'confirm',
    message: 'Begin tracking that coin now?',
  },
];

const check = (coin) => {
  if (fs.readFileSync(saved)) {
    fs.readFile(saved, (err, data) => {
      error(err);
      if (data.includes(coin)) update(coin, data)
      else {
        console.log(`No saved data for ${coin.toUpperCase()} found.`);
        inquirer
          .prompt(askInit)
          .then((ans) => {
            if (ans.conf) init(coin)
            else ask();
          });
      }
    });
  } else {
    console.log('Saved coins file missing.');
    ask();
  };
};
const update = (coin, data) => {
  inquirer
    .prompt(questions)
    .then((ans) => {
      const list = JSON.parse(data);
      const matches = list.filter((index) => index.coin === coin);
      const filtered = list.filter((index) => !index.coin === coin);
      if (matches.length > 0) {
        const old = matches[0];
        const date = dayjs().format('MM/DD/YY');
        const coin = new Coin(old.coin, old.invested.cashSpent,
          old.invested.coinsPurchased, old.rewards.mining, old.rewards.staking,
          old.spent.coinsSpent, old.spent.cashMade, date);
        if (ans.what.includes('Amount invested')) coin.invest(ans.investCash, ans.investCoins);
        if (ans.what.includes('Mining rewards')) coin.mine(ans.mined);
        if (ans.what.includes('Staking rewards')) coin.reward(ans.stakes);
        if (ans.what.includes('Coins spent')) coin.spend(ans.spentCoins, ans.cashBack);
        filtered.push(prev);
        fs.writeFile(saved, JSON.stringify(filtered), (e) => {
          error(e);
          console.log(`Record for ${coin} updated.`);
          ask();
        });
      } else {
        console.log(`You don't have any record saved for ${coin}. "cointrack init ${coin}" to begin tracking it.`);
        ask();
      }
    });
};

module.exports = check;
