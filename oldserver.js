const http = require('http');// ccm
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvents = require('./logEvents'); // we import this custom module we created
const EventEmitter = require('events'); // common core event module

class Emitter extends EventEmitter { };

// initialising the object
const emitter = new Emitter(); // creating using new just like in oops

// log emit listener
emitter.on('log', (msg, fileName)=> logEvents(msg , fileName));

// port for our web server
const PORT = process.env.PORT || 3400;

// reusable function for errors , serving files etc
const serveFile = async( filePath , contentType , response)=>{
    // response is used inside the serveFile
    try{
        const rawData = await fsPromises.readFile(
            filePath ,
            !contentType.includes('image')? 'utf-8' : '' // if content type is image, don't encode else utf-8
             
             ); // consider it as a raw data file
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData; // if content is json, parse it in json format or else the raw data
        response.writeHead( 
            filePath.includes('404.html') ? 404 : 200 , // if file path has error page i.e., serving the 404, status is 404 or else 200 (successful)
            
            {'Content-Type': contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data // if we are sending json, we send it as a string or else default data
        );

    }catch(err){
        // catching error
        console.log(err);
        emitter.emit('log',`${err.name}\t${err.msg}`,'errorLog.txt');
        response.statusCode = 500; // server error
        response.end(); // end response
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    emitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt'); // emmit log , with request url, method and destination for log event(txt)

    // switch is better to handle , this is a naive way to serve files 
    // responses
    // let filePath;
    // if (req.url === "/" || req.url === 'index.html') {
    //     res.statusCode = 200; // good , active , successful
    //     res.setHeader('Content-Type', 'text/html'); // we will serve the html page
    //     filePath = path.join(__dirname, 'views', 'index.html'); // define path to the index file
    //     fs.readFile(filePath, 'utf-8', (err, data) => {
    //         // handle error
    //         if(err) throw err;
    //         //we read the file , and then send the data
    //         res.end(data);
    //     })
    const extension = path.extname(req.url);
    let contentType; 
    // switch the extension for serving different files
    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;

        case '.js':
            contentType = 'text/javascript';
            break;

        case '.json':
            contentType = 'application/json';
            break;

        case '.jpg':
            contentType = 'images/jpg';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.txt':
            contentType = 'text/plain';
            break;
        
        default : 
            contentType = 'text/html';

    }
    // ternary chaining
    let filePath = 
            contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                 ? path.join(__dirname,'views' , req.url, 'index.html')
                 : contentType === 'text/html'
                     ? path.join(__dirname, 'views', req.url)
                     : path.join(__dirname, req.url);

    // this makes the .html extension not mandatory / required in the browser
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    // if file exists (boolean) 
    const fileExists = fs.existsSync(filePath);

    if(fileExists){
        // serve the file
        serveFile( filePath , contentType , res); // we use res in the server
    }
    else{
        // 404 : not found
        // 301 : redirect
        // switch the base of the file path
        switch(path.parse(filePath).base) // parses the different parts of the filePath
        {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'}); // redirect 
                res.end(); // end the response
                break;
            
            case 'www-page.html' :
                res.writeHead(301, { 'Location': '/'}); // redirect to the root/homepage
                res.end();
                break;
            
            default: // should always be 404
                // ... serve 404 response
                serveFile( path.join(__dirname , 'views' , '404.html') , 'text/html' , res);
                
        }
    }

})


// handle error
// process.on('uncaughtException',err=>{
//     console.log(`There was an uncaught exception ${err}`);
//     process.exit(1);
// })

// listen in the end of the js file
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// add listener for the log event
 // on the log, we pass the msg to the logEvents async func

// emit the log event with a message after a 2s delay
setTimeout(()=>{
   
},2000);