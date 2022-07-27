// for handling routes in root
const express = require('express');
const router = express.Router();
const path = require('path');

// route for home
router.get('^/$|/index|/home?', (req,res)=>{
    res.sendFile(path.join(__dirname , '..','views' , 'index.html'));
})
// route for new page
router.get('^/new|/new-page|/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname, '..','views', 'new-page.html'));
    res.status(201);
})
// redirect to new when old-page requested
router.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/new-page.html'); // 302 default code
});


module.exports = router;