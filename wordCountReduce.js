const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const combine = {};
rl.on('line', (line) => {
  const splits = line.split(" ");

  if (splits[0] in combine) {
    combine[splits[0]] += Number(splits[1])
  } else {
    combine[splits[0]] = Number(splits[1]);
  }
});


rl.once('close', () => {
  let res = '';
  for (let key in combine) {
    res += `${key} ${combine[key]}\n`;
  }

  if (res.length > 0) {
    res = res.substring(0, res.length - 1); // remove last new line character;
  }

  process.stdout.write(res);
});
