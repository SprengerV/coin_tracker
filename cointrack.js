const path = require('path');
const init = require(path.join(__dirname, 'lib', 'init.js'));
const update = require(path.join(__dirname, 'lib', 'update.js'));
const balance = require(path.join(__dirname, 'lib', 'balance.js'));
const ask = require(path.join(__dirname, 'lib', 'ask.js'));

const func = process.argv[2];
const coin = process.argv[3];
const help = `
cointrack init %COIN%                         Begin tracking that coin.
cointrack update %COIN%                       Update a coin you're already tracking.
countrack balance %COIN%                      See the running totals for a coin you're tracking.
`

//if (!func) console.log('You must pass additional arguments.', help);
if (!func) ask();
else if (func === 'init') init(coin.toLowerCase());
else if (func === 'update') update(coin);
else if (func === 'balance') balance(coin);
else if (func === 'help') console.log(help);
else console.log(`Error: Invalid argument(s). ${help}`);
