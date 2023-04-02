const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  favoriteFoods: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Person', personSchema);