import chalk from "chalk";

function extractLinks(linksArray){
    return linksArray.map(linkObject => Object.values(linkObject).join());
}

async function checkStatus(urlList){
    const statusList = await Promise.all(
        urlList.map(async url => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                return manageErrors(error);
            }
         
        })
    )

    return statusList;
}

function manageErrors(error){
    if(error.cause.code === 'ENOTFOUND'){
        return 'link not found';
    }else{
        return 'something went wrong';
    }
    
}

export default async function validList(linkList){
    const links = await extractLinks(linkList);
    const status = await checkStatus(links);
    
    return linkList.map((object, index) => ({
        ...object,
        status: status[index]
    }));
}


