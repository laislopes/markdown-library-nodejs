import fs from 'fs';
import chalk from 'chalk';

function treatError(error){
    console.log(error);
    throw new Error(chalk.red(error.code, "The file doesn't exist"));
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

getFile('./files/text.md');
