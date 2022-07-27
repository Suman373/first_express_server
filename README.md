### This is an Express Application 

#### Purpose : Since I am currently learning Node, I started dwelling with Express too which makes things more clear and helps us write less? I ain't no expert yet hehe. If you are viewing this, might wanna put ur personal opinions or tricks?

#### Lessons : These are the few things I learned while making this ( from Youtube + official documentation) 
- intitialising an express app , importing and using it
- checking routes, redirect and serving static files without `switch cases` and by using `app.get('/', (req,res)=>{...})`
- using built-in middlewares and making a custom error handler middleware.
- logging requests and errors in files with `fs.write`
- asynchronous dynamic CORS configuration


### Getting started 
run this command after cloning the repo.
```
npm install
```

install nodemon as dev dependency and fix the package.json like
```
"scripts": {
    "start": "node server",
    "dev": "nodemon server"
  },
```
run this in your terminal 
```
npm run dev
```
