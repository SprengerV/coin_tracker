class Coin {
  constructor(name, investUSD, investCoins, mined, rewards, cashSpent, coinsSpent, cashMade, date) {
    this.coin = name;
    this.invested = {
      cashSpent: investUSD,
      coinsPurchased: investCoins,
    };
    this.rewards = {
      mining: mined,
      staking: rewards,
    };
    this.spent = {
      coinsSpent: coinsSpent,
      cashMade: cashMade,
    };
    this.totalCoins = investCoins + mined + rewards - coinsSpent;
    this.netCost = cashSpent - cashMade;
    this.lastUpdate = date;
  }

  invest(C, c) {
    this.invested.cashSpent += C;
    this.netCost += C;
    this.invested.coinsPurchased += c;
    this.totalCoins += c;
  }

  mine(c) {
    this.rewards.mining += c;
    this.totalCoins += c;
  }

  reward(c) {
    this.rewards.staking += c;
    this.totalCoins += c;
  }
  
  spend(c, C) {
    this.spent.coinsSpent += c;
    this.totalCoins -= c;
    this.cashMade += C;
    this.netCost -= C;
  }
}
module.exports = Coin;
