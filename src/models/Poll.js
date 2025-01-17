const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  votes: [Number],
  isActive: { type: Boolean, default: true },
});

const Poll = mongoose.model('Poll', PollSchema);
module.exports = Poll;

