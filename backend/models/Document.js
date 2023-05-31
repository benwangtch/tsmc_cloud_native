const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.String,
    ref: 'users',
  },
  type: {
    type: String,
    default: 'private',
  },
  userName: {
    type: mongoose.Schema.Types.String,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('document', DocumentSchema);
