const auth = require('../middleware/auth');
const {Activity, validate} = require('../models/activity');
const {User, validateUser} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//return all activities
router.get('/', async (req, res) => {
    const activities = await Activity.find();
    res.send(activities);
  });

//return all activities for an idUser
   router.get('/myactivities/:id', async (req, res) => {

    const user = await User.findById(req.params.id);

    //prendo le ref delle activities nel user
    const activitiesRef = user.activities;
    let activities= [];

    //per ogni activity di activitiesRef richiedo al db di restituirmi tutta l'activity per poi effettuare il push in un altro array
    for (const activity of activitiesRef) {
      let act =  await Activity.findById(activity._id);
      activities.push(act);

    }
    //send dell'array con le sole activity dell'user
    res.send(activities);
  }); 
  
//create a new activity with desc and status
router.post('/myactivities/new', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let activity = new Activity({ description: req.body.description, status: req.body.status });
    activity = await activity.save();

    const user = await User.findByIdAndUpdate(req.user._id, {$push:
          {
            "activities" :
                {
                  _id: activity._id
                }
            }
    });
    if (!user) return res.status(400).send(error.details[0].message);
    res.send(activity);

  });

  //update desc data with the give id
  router.put('/myactivities/update/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const activity = await Activity.findByIdAndUpdate(req.params.id, { description: req.body.description, status: req.body.status}, {
      new: true
    });
  
    if (!activity) return res.status(404).send('ID non trovato');
    
    
    res.send(activity);
  });
  
  //delete activity with the given id
  router.delete('/myactivities/delete/:id', auth, async (req, res) => {
    
    //searching user by id for accessing control for delete operation 
    const user = await User.findById(req.user._id);
    //searching activity to check if exist
    const activity = await Activity.findById(req.params.id);

    //if array activities contains activity's id passed in req
    if(user.activities.includes(req.params.id)){

      //delete the ref of activity that we want to delete
     await User.findByIdAndUpdate(req.user._id, {$pull:
      {
        activities : {$in: [req.params.id]}
        }
    },
    { new: true });
      //delete the activity
      await Activity.deleteOne({_id: req.params.id});
    
      //array not contains id passed in req means access denied
   } else return res.status(403).send("Accesso negato");
   
    //if activity does not exists send 404 error   
    if (!activity) return res.status(404).send('ID non trovato');

    //send activity deleted
    res.send(activity);
  });
  
  //get single activity with the given id
  router.get('/myactivities/single/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id);
  
    if (!activity) return res.status(404).send('ID non trovato');
    console.log('single activity:', activity);
    res.send(activity);
  });
  
  module.exports = router;