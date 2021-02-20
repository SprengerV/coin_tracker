const init = require('./lib/init.js');
const update = require('./lib/update.js');
const balance = require('./lib/balance.js');

const func = process.argv[2];
const coin = process.argv[3].toLowerCase();
const help = `\n"cointrack init %COIN%" to begin tracking that coin.
"cointrack update %COIN%" to update a coin you\'re already tracking.
"countrack balance %COIN%" to see the running totals for a coin you\'re tracking.`

if(!func) console.log(`You must pass additional arguments. ${help}`)
else if(func == 'init') init(coin)
else if(func == 'update') update(coin)
else if(func == 'balance') balance(coin)
else if(func == 'help') console.log(help)
else console.log(`Error: Invalid argument(s). ${help}`);
