const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, error => {
  !error ? console.log('Folder deleted successfully') : console.error(error);
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, error => {
    !error ? console.log('Folder created successfully') : console.error(error);
    fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (error, files) => {
      if (!error) {
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), error => {
            !error ? console.log(`File ${file.name} copied successfully`) : console.error(error);
          });
        });
      } else {
        console.error(error);
      }
    });
  });
});