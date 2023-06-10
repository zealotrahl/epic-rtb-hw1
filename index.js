const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs');
const readline = require('readline');
const { exec, execFile } = require("child_process");


const argv = yargs(hideBin(process.argv)).argv

if (argv._.length != 4 || (argv._[0] != 'map' && argv._[0] != 'reduce')) {
  console.error("Wrong input");
  return;
}

const pathToScript = argv._[1];

if (!fs.existsSync(pathToScript) || !(fs.statSync(pathToScript).mode & fs.constants.S_IXUSR)) {
  console.error("Script does not exists or is not executable");
  return;
}

if (argv._[0] == 'map') {
  const pathToSrcFile = argv._[2];
  const pathToDstFile = argv._[3];

  if (!fs.existsSync(pathToSrcFile)) {
    console.error("src file does not exists");
    return;
  }

  const mapChildProcess = execFile(pathToScript, (error, stdout, stderr) => {
    if (error) {
      console.error("Map script failed with error");
      throw error;
    }

    fs.writeFileSync(pathToDstFile, stdout);

    console.log("Map script finished executing");
  })

  const lineReader = readline.createInterface({
    input: fs.createReadStream(pathToSrcFile)
  });

  lineReader.on('line', (line) => {
    mapChildProcess.stdin.write(line + "\n");
  });

  lineReader.on('close', () => {
    mapChildProcess.stdin.end();
  });

} else {
  const pathToSrcFile = argv._[2];
  const pathToDstFile = argv._[3];

  if (!fs.existsSync(pathToSrcFile)) {
    console.error("src file does not exists");
    return;
  }

  const reduceChildProcess = execFile(pathToScript, (error, stdout, stderr) => {
    if (error) {
      console.error("Reduce script failed with error");
      throw error;
    }

    fs.writeFileSync(pathToDstFile, stdout);

    console.log("Reduce script finished executing");
  })

  const lineReader = readline.createInterface({
    input: fs.createReadStream(pathToSrcFile)
  });

  lineReader.on('line', (line) => {
    reduceChildProcess.stdin.write(line + "\n");
  });

  lineReader.on('close', () => {
    reduceChildProcess.stdin.end();
  });
}
