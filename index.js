import fs from 'fs';
import chalk from 'chalk';

function treatError(error){
    console.log(error);
    throw new Error(chalk.red(error.code, "The file doesn't exist"));
}

async function getFileAsync(filePath){
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(filePath, encoding);
        console.log(chalk.green(text));
    } catch(error){
        treatError(error);
    }
}

function getFileAsyncWithPromise(filePath){
    const encoding = 'utf-8';
    fs.promises
      .readFile(filePath, encoding)
      .then((text) => console.log(chalk.green(text)))
      .catch(treatError);
}

function getFile(filePath){
    const encoding = 'utf-8';
    fs.readFile(filePath, encoding, (error, text) =>{
        if(error){
            treatError(error);
        }
        console.log(chalk.green(text));
    });
}

// getFile('./files/text.md');
// getFileAsyncWithPromise('./files/text.md');
getFileAsync('./files/text.md');
getFileAsync('./files/');