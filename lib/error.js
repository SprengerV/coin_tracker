const path = require('path');
const ask = require(path.join(__dirname, 'ask.js'));

const error = (err) => {
  if (err) {
    console.log(err);
    ask();
  };
};

module.exports = error;
