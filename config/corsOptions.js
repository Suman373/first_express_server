// cors configuration for our backend
// Cross Origin Resource Sharing, prevents access from other origin
// whitelist bypasses the cors error, i.e., the origins in the whitelist will be able to fetch from the backend
// configuring cors asynchronously dynamically from an allowed/whitelist urls
const whitelist = ['http://localhost:5500',
                   'http://localhost:3400'] ;
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

module.exports = corsOptions;