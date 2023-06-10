const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let res = "";
rl.on('line', (line) => {
  const splits = line.split(" ");

  for (let i = 0; i < splits.length; i++) {
    res += `${splits[i]} 1\n`;
  }
});

rl.once('close', () => {
  if (res.length > 0) {
    res = res.substring(0, res.length - 1); // remove last new line character;
  }

  process.stdout.write(res);
});
