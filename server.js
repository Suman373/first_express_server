//  we will use express framework in this server
const express = require('express');
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3400;
// setting up of our app(formerly server)
const app = express();

// our custom middlware imported from the logEvents.js
app.use(logger);

// cors config
app.use(cors(corsOptions));

// middleware to handle urlencoded data (built-in)
// urlencoded --> form-data
app.use(express.urlencoded({extended : false}));
// middlware for json
app.use(express.json());


//**** SERVING STATIC FILES**** */ 
// serving static files (from public folder) readily to the client/user
app.use('/', express.static(path.join(__dirname, '/public')));
// server statics to subdir also
app.use('/subdir', express.static(path.join(__dirname, '/public')));


// ******** ROUTES ***************
// Requested routes are inside the route folder
app.use('/', require('./routes/roots'));
app.use('/subdir', require('./routes/subdir'));
app.use('/colleagues', require('./routes/api/colleagues'));


// every other routes
// app.get('/*', (req,res)=>{
//     res.status(404).sendFile(path.join(__dirname , 'views', '404.html')); // we put status 404 as while serving the 404.html, it gets status of 200 (file found in views folder)
// })

// **** Catch ALL 404 ***********
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