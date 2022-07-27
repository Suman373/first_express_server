//for handling our routes in subdir
const express = require('express');
const router = express.Router(); // use Router from express
const path = require('path');


router.get('^/$|/index|/home?', (req,res)=>{
    res.sendFile(path.join(__dirname , '..' , 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req,res)=>{
    res.sendFile(path.join(__dirname , '..' , 'views', 'subdir', 'test.html'));
});


module.exports = router;
