const fs = require('fs');
const path = require('path');

let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
  if (!error) {
    files.forEach(file => {
      if (path.parse(file).ext === '.css') {
        let readStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
        readStream.pipe(writeStream);
      }
    });
  } else {
    console.error(error);
  }
});