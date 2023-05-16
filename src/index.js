import fs from 'fs';
import chalk from 'chalk';

function extractLinks(text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const matches = [...text.matchAll(regex)];
    const results = matches.map(match => ({[match[1]]:match[2]}));
    return results.length !== 0 ? results : 'There are not links';
}

function treatError(error){
    console.log(error);
    throw new Error(chalk.red(error.code, "The file doesn't exist"));
}

async function getFileAsync(filePath){
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(filePath, encoding);
        return extractLinks(text);
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
// getFileAsync('./files/');
getFileAsync('./files/text.md');

export default getFileAsync;