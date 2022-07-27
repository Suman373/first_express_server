//  for routes to colleagues
const express = require('express');
const router = express.Router();
const path = require('path');

//data object for get, post,
const data ={};
data.colleagues = require('../../data/colleagues.json'); // like connecting to db

// routes handling for colleagues 
// syntax : router.route() --> then chain them
router.route('/')
   .get((req,res)=>{
        res.json(data.colleagues);
   })
   .post((req,res)=>{
        res.json({
            // getting parameters from post request and sending them back
            "name" : req.body.name,
            "position": req.body.position
        });
   })
   .put((req,res)=>{
        res.json({
            "name" : req.body.name,
            "position": req.body.position
        });
   })
   .delete((req,res)=>{
        res.json({ "id": req.body.id});
   }); // ends the routing chain


router.route('/:id')
   .get((req,res)=>{
        res.json({ "id" : req.params.id }); // pulling in the parameter directly from the url , when a certain id is routed
   })


module.exports = router;
