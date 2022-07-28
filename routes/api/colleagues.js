//  for routes to colleagues
const express = require('express');
const router = express.Router();
const path = require('path');
const colleagueController = require('../../controllers/colleagueController');

// routes handling for colleagues 
// syntax : router.route() --> then chain them
// the logic is implemented in the controllers
router.route('/')
   .get(colleagueController.getAllColleagues)
   .post(colleagueController.createNewColleague)
   .put(colleagueController.updateColleague)
   .delete(colleagueController.deleteColleague); // ends the routing chain

// specific route on a certain colleague id
router.route('/:id')
   .get(colleagueController.getColleague)


module.exports = router;
