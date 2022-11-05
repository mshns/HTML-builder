const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (error, files) => {
  if (!error) {
    files.forEach(file => {
      if (file.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
          if (!error) {
            let fileName = path.parse(path.join(__dirname, 'secret-folder', file.name)).name;
            let fileExt = path.extname(path.join(__dirname, 'secret-folder', file.name)).slice(1);
            let size = stats.size;
            console.log(fileName + ' - ' + fileExt + ' - ' + size + ' bytes');
          } else {
            console.error(error);
          }
        })
      }
    });
  } else {
    console.error(error);
  }
});