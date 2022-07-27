//  we will use express framework in this server
const express = require('express');
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors');
const PORT = process.env.PORT || 3400;
// setting up of our app(formerly server)
const app = express();

// our custom middlware imported from the logEvents.js
app.use(logger);

// Cross Origin Resource Sharing, prevents access from other origin
// whitelist bypasses the cors error, i.e., the origins in the whitelist will be able to fetch from the backend
// configuring cors asynchronously dynamically from an allowed/whitelist urls
const whitelist = ['http://localhost:5500','http://localhost:3400'] ;
const corsOptions = {
    origin:  (origin,callback) =>{
        if(whitelist.indexOf(origin)!== -1 || !origin){
            // allowed
            callback(null,true);
        }else{
            callback(new Error("Hey : Not allowed By CORS ")); // create error
            // callback(false,origin);
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

// middleware to handle urlencoded data (built-in)
// urlencoded --> form-data
app.use(express.urlencoded({extended : false}));
// middlware for json
app.use(express.json());

// serving static files (from public folder) readily to the client/user
app.use(express.static(path.join(__dirname, '/public')));

// REQUESTED ROUTES

// route for index/home page
app.get('^/$|/index|/home?', (req,res)=>{
    res.sendFile('./views/index.html', {root: __dirname});
})

// route for new page
app.get('/new|/new-page|/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
    res.status(201);
})

// redirect to 
app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/new-page.html'); // 302 default code
})

// every other routes
// app.get('/*', (req,res)=>{
//     res.status(404).sendFile(path.join(__dirname , 'views', '404.html')); // we put status 404 as while serving the 404.html, it gets status of 200 (file found in views folder)
// })

app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:'404 not found'});
    }
    else{
        res.type('txt').send("404 not found. Sorry");
    }
    
})

// error handling
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server running successfully on port ${PORT}`));