const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  // dateRegister: { type: Date, default: Date.now },
  
  dateRegister: { 
    type: Date,
   },

  name: {
    type: String,
    required: true,
    // unique: true
  },
  
  lastName: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },

  company: {
    type: String,
    required: true,
  },

  telephone: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('User', Schema);
