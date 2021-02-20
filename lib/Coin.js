class Coin {
  constructor(name, investUSD, investCoins, mined, rewards) {
    this.name = name;
    this.invest = {
      usd: investUSD,
      coins: investCoins
    };
    this.earned = {
      mined: mined,
      staking: rewards
    };
    this.total = investCoins + mined + rewards;
  };
  invest = (C, c) => {
    this.invest.usd += C;
    this.invest.coins += c;
    this.total += c;
  };
  mine(c) {
    this.earned.mined += c;
    this.total += c;
  };
  reward(c) {
    this.earned.rewards += c;
    this.total += c;
  };
};
module.exports = Coin;
