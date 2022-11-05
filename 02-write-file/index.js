const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdout.write('Hi! Enter any text please...\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') exit();
  output.write(data);
});

process.on('exit', () => stdout.write('Have a nice day, bye!\n'));
process.on('SIGINT', exit);