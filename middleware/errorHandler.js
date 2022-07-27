const {logEvents} = require('./logEvents');

// handle our errors and put them inside the text file
const errorHandler = (err, req,res,next)=>{
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.log(err.stack);
    res.status(500).send(err.message); // set status 500(Server error) and send the error message
}

module.exports = errorHandler;