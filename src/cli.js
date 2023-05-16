
import chalk from 'chalk';
import fs, { lstat } from 'fs';
import getFileAsync from './index.js';
import validList from './http-validacao.js';

const path = process.argv;

async function printList(validation, result, identifier = ''){
    if(validation){
        console.log(
            chalk.yellow('valid list'), 
            chalk.black.bgGreen(identifier),
            await validList(result));
    }else{
        console.log(
            chalk.yellow('valid list'), 
            chalk.black.bgGreen(identifier),
            result);
    }
    
} 

async function processText(parameters){
    const path = parameters[2];
    const validation = parameters[3] === '--valid';

    try{
        fs.lstatSync(path);
    }catch(error){
        if(error.code === 'ENOENT'){
            console.log("File or Directory doesn't exist");
            return;
        }
    }

    if(fs.lstatSync(path).isFile()){
        const result = await getFileAsync(path);
        printList(validation, result);
    }else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        files.forEach(async fileName => {
            const list = await getFileAsync(`${path}/${fileName}`);
            printList(validation, list, fileName);
        });
    }

}

processText(path);