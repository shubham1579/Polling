const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  optionText: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions',
    required: true,
  },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
