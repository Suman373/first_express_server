// controls the logic for route handling 
const data ={};
data.colleagues = require('../../data/colleagues.json'); // like connecting to db


// get one specific colleague ,get
const getColleague = (req,res)=>{
    res.json({ "id" : req.params.id }); // pulling in the parameter directly from the url , when a certain id is routed
}

// get all colleague request, read
const getAllColleagues =(req,res)=>{
    res.json(data.colleagues);
}

// post request, create colleague
const createNewColleague = (req,res)=>{
    res.json({
        // getting parameters from post request and sending them back
        "name" : req.body.name,
        "position": req.body.position
    });
}

// put request , update one specific
const updateColleague = (req,res)=>{
    res.json({
        "name" : req.body.name,
        "position": req.body.position
    });
}

// del request, delete 
const deleteColleague =(req,res)=>{
    res.json({ "id": req.body.id});
}

module.exports = { getColleague, getAllColleagues , createNewColleague , updateColleague, deleteColleague};
