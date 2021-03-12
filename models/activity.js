const Joi = require('joi');
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    status:{
        type: String,
        enum: {
          values: ['pending', 'completed', 'cancelled']
        }
    },
    from:{
        type: Date
    },
    to:{
        type: Date
    }
  });
  
  const Activity = mongoose.model('Activity', activitySchema);
  
  function validateActivity(activity) {
    const schema = {
      description: Joi.string().min(5).max(255).required(),
      status: Joi.string().valid('pending', 'completed', 'cancelled')
    };
  
    return Joi.validate(activity, schema);
  }
  
  exports.activitySchema = activitySchema;
  exports.Activity = Activity; 
  exports.validate = validateActivity;