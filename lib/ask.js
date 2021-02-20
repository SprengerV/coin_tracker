const Coin = require('./Coin');

const init = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: `What is the coin's symbol?`
      },
      {
        name: 'invest',
      },
    ])
    .then((ans) => {
      const invest = {
        usd: ans.cashIn
        coins: ans.coinsIn
      };
      const coin = new Coin(name, invest, mined, rewards);
    });
};

const update = () => {
  inquirer
    .prompt([
      {
        name: 'choice',
        type: 'checklist',
        message: 'Which have you done since last time',
        choices: [mine, invest, reward]
      },
      {
        {
          when: this.choice = mine
        },
        type: 'input',
        name: 'mined',
        message: `How much ${coin} have you mined?`
      },
      {
        {
          when: this.choice == invest
        },
        type: 'input',
        name: 'cashIn',
        message: 'How much did you invest (USD)?'
      },
      {
        {
          when: this.choice == invest
        },
        type: 'input',
        name: 'coinIn',
        message: 'How much VEIL did that get you?'
      },
    ])
    .then((ans) => {
    //  const newCoin = new Crypto( ); //all of the answers as arguments
    //  fs.writefile(`${ans.coin}.json`, newCoin)
      console.log(ans);
    });
};


module.exports = {
  init: init,
  update: update
};
