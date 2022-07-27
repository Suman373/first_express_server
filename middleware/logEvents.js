console.log("testing");
const { format } = require('date-fns'); // imports the date-fns and destructures the format

// alternate : import {v4 as uuid} from 'uuid'; 
const { v4:uuid}  = require('uuid');

const fs = require('fs');
const fsPromises =require('fs').promises;
const path = require('path');

const logEvents = async(message , logName)=>{
    const dateTime = `${format(new Date(), 'dd/MM/yyyy \t HH:mm:ss')}`;
    const logItem = `${dateTime}\t ${uuid()}\t${message}\n`;
    console.log(logItem);

    try{
        // if logs dir doesn't exist,  create a dir named logs and then append
        if(!fs.existsSync(path.join(__dirname,"..", "logs"))){
            await fsPromises.mkdir(path.join(__dirname,"..",'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, "..",'logs',logName), logItem); // append/if not create a file in folder logs, named with the passed logName
    } 
    catch(err){
        console.log(err,'caught error !'); 
    }
}


// this is our custom middleware named logger
// @params : req,res,next
const logger =(req,res,next)=>{
    console.log(`${req.method} ${req.path}`);
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}` , 'reqLog.txt');
    // req -> method , origin of req, and the url
    next();
}

module.exports = {logger, logEvents};
