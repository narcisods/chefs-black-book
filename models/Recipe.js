const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  chef: {
    type: String,
    required: 'This field is required.'
  },  
    status: {
    type: String,
    required: 'This field is required.'
  },
  name: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  }, 
  instructions: {
  type: String,
  required: 'This field is required.'
  },
  notes: {
    type: String,
    required: false
    },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: ['Component', 'Sauce', 'Final'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: false
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

recipeSchema.index({ name: 'text', description: 'text' });
// // WildCard Indexing
// //recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);