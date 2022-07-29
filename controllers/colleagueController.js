// controls the logic for route handling 
const data = {
    // similar to react --> considering MERN
    colleagues : require('../model/colleagues.json'),// like connecting to db
    setColleagues : function (data) {this.colleagues = data;}
};



// get one specific colleague ,get
const getColleague = (req,res)=>{
   // create colleague check if exists
   const colleague = data.colleagues.find(coll=> coll.id !== parseInt(req.params.id)); // as we pull it out of the url /:id
   // if colleague not found
   if(!colleague){
    // error
        return res.status(400).json({"message": `Colleague with ID ${req.params.id}`})
   }
    res.json(data.colleagues); // send the data
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
    // create colleague 
    const colleague = data.colleague.find(coll=> coll.id === parseInt(req.body.id)); //find the user in valid id
    if(!colleague){// colleague not found
        return res.status(400).json({ "message" : `Colleague ID ${req.body.id} not found!` });// error
    } 
    // if exists
    if(req.body.name) colleague.name = req.body.name; // set the new name
    if(req.body.position) colleague.position = req.body.position; // set the new position
    // filter array where existing record of colleague is removed
    const filteredArray = data.colleagues.filter(coll => coll.id !== parseInt(req.body.id));
    // non-chronological array where the new colleague is added to the filtered array
    const unsortedArray = [...filteredArray,colleague]; // add the colleague
    // sort the array 
    data.setColleagues(unsortedArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0 ));
    res.json(data.colleagues);
}



// del request, delete 
const deleteColleague =(req,res)=>{
     // create colleague 
     const colleague = data.colleague.find(coll=> coll.id === parseInt(req.body.id)); //find the user in valid id
     if(!colleague){// colleague not found
         return res.status(400).json({ "message" : `Colleague ID ${req.body.id} not found!` });// error
     } 
     // if exists
     if(req.body.name) colleague.name = req.body.name; // set the new name
     if(req.body.position) colleague.position = req.body.position; // set the new position
     // filter array where existing record of colleague is removed
     const filteredArray = data.colleagues.filter(coll => coll.id !== parseInt(req.body.id));
    //  now, set the filtered array to the setColleagues
     data.setColleagues([...filteredArray]);
     res.json(data.colleagues); // return colleagues
}

module.exports = { getColleague, getAllColleagues , createNewColleague , updateColleague, deleteColleague};
