const fs = require('fs');
const path = require('path');
const ask = require(path.join(__dirname, 'ask.js'));

const saved = path.join(__dirname, '..', 'src', 'savedCoins.json');

const balance = (coin) => {
  if (fs.existsSync(saved)) {
    fs.readFile(saved, (err, data) => {
      const list = JSON.parse(data);
      const ledger = list.filter((index) => index.coin === coin);
      ledger.forEach((index) => console.log(index));
    });
  } else {
    console.log(`You don't have any saved coins.`);
    ask();
  }
};
module.exports = balance;
