const fs = require('fs');
const path = require('path');

// creat project-dist folder

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive : true }, error => {
  if (!error) {
    fs.rm(path.join(__dirname, 'project-dist', 'assets'), { recursive: true, force: true }, error => {
      !error ? console.log('Folder assets deleted successfully') : console.error(error);
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, error => {
        !error ? console.log('Folder assets created successfully') : console.error(error);

// copy assets folder with files

        fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (error, folders) => {
          if (!error) {
            folders.forEach(folder => {
              fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder.name), { recursive: true }, error => {
                console.log(`Folder ${folder.name} created successfully`);

                fs.readdir(path.join(__dirname, 'assets', folder.name), {withFileTypes: true}, (error, files) => {
                  if (!error) {
                    files.forEach(file => {
                      fs.copyFile(path.join(__dirname, 'assets', folder.name, file.name), path.join(__dirname, 'project-dist', 'assets', folder.name, file.name), error => {
                        !error ? console.log(`File ${file.name} copied successfully`) : console.error(error);
                      });
                    });
                  } else {
                    console.error(error);
                  }
                });

              });
            });
          } else {
            console.error(error);
          }
        });

      });

// creat style.css

      let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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

// creat index.html

      fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (error, buffer) => {
        if (!error) {
          fs.readdir(path.join(__dirname, 'components'), (error, files) => {
            if (!error) {
              files.forEach(file => {
                fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (error, content) => {
                  if (!error) {
                    buffer = buffer.replace(`{{${path.parse(file).name}}}`, content);
                    let indexWriteStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                    indexWriteStream.write(buffer);
                  } else {
                    console.error(error);
                  }
                });
              });
            } else {
              console.error(error);
            }
          });
        } else {
          console.error(error);
        }
      });

    });
  } else {
    console.error(error);
  }
});