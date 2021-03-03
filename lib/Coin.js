class Coin {
  constructor(name, investUSD, investCoins, mined, rewards) {
    this.coin = name;
    this.invested = {
      cashSpent: investUSD,
      coinsPurchased: investCoins,
    };
    this.rewards = {
      mining: mined,
      staking: rewards,
    };
    this.total = investCoins + mined + rewards;
  }

  invest(C, c) {
    this.invested.cashSpent += C;
    this.invested.coinsPurchased += c;
    this.total += c;
  }

  mine(c) {
    this.rewards.mining += c;
    this.total += c;
  }

  reward(c) {
    this.rewards.staking += c;
    this.total += c;
  }
}
module.exports = Coin;
