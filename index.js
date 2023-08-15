/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import * as fs from 'fs';

inquirer
  .prompt([
    {
        type: "input",
        name: "URL",
        message: "Please write your URL: "
    }
 ])
  .then((answers) => {
        console.log(answers.URL); // User typed url
        var qr_svg = qr.image(answers.URL);
        qr_svg.pipe(fs.createWriteStream('qr_code.png'));
        
        // Create a text file to save the URL
        fs.writeFile('url.txt', answers.URL, (err) => {
            if (err) throw err;
            console.log('The file has been saved!')
        })
        
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log("Something else went wrong")
    }
  });
