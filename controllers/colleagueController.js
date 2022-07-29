// controls the logic for route handling 
const data = {
    // similar to react --> considering MERN
    colleagues : require('../model/colleagues.json'),// like connecting to db
    setColleagues : function (data) {this.colleagues = data;}
};



// get one specific colleague ,get
const getColleague = (req,res)=>{
    res.json({ "id" : req.params.id }); // pulling in the parameter directly from the url , when a certain id is routed
}

// get all colleague request, read
const getAllColleagues =(req,res)=>{
    res.json(data.colleagues); // we get all the colleagues by referencing data.colleagues
}

// post request, create colleague
const createNewColleague = (req,res)=>{
   const newColleague = {
    //  we create new colleague by +1 to the last id , if no user then 1
     id: data.colleagues[data.colleagues.length-1].id + 1 || 1,
     // store name and position
     name: req.body.name,
     position: req.body.position
   }
   // checks for null values
   if( !newColleague.name || !newColleague.position){
       // handle error
       return res.status(400).json({'message': 'Both name and position required.'});
   }

   data.setColleagues([...data.colleagues, newColleague]); // copy all others , then add new one after them
   res.status(201).json(data.colleagues); // 201 : record created
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
