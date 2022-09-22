const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  creator: {
    type: String,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Component', 'Sauce', 'Final'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);